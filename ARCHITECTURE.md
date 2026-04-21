# 🏗️ ARCHITECTURE.md — Technical Map

This document explains where code lives, why decisions were made, and how the pieces fit together. Read this before writing any new code.

---

## 📁 Folder Structure

```
mobile-testing-playground/
├── assets/                   # Static assets (images, fonts, icons)
├── src/
│   ├── components/           # Shared, reusable UI components
│   │   ├── BugCard.jsx       # Card for displaying a single bug summary
│   │   ├── StatusBadge.jsx   # Colour-coded badge for bug/test status
│   │   ├── ChartWidget.jsx   # Wrapper around react-native-chart-kit
│   │   └── EmptyState.jsx    # Placeholder shown when a list has no items
│   │
│   ├── screens/              # Full-page screen components (one per route)
│   │   ├── DashboardScreen.jsx
│   │   ├── BugListScreen.jsx
│   │   ├── BugDetailScreen.jsx
│   │   ├── BugReportScreen.jsx
│   │   ├── TestCaseListScreen.jsx
│   │   ├── TestCaseDetailScreen.jsx
│   │   └── LoginScreen.jsx
│   │
│   ├── navigation/           # Navigation configuration
│   │   ├── AppNavigator.jsx  # Root navigator (auth guard + tab navigator)
│   │   ├── BugStack.jsx      # Stack navigator for bug-related screens
│   │   └── TestStack.jsx     # Stack navigator for test case screens
│   │
│   ├── services/             # All external communication (Firebase, OpenAI)
│   │   ├── firebase.js       # Firebase app initialisation and exports
│   │   ├── bugService.js     # CRUD operations for bug reports
│   │   ├── testCaseService.js# CRUD operations for test cases
│   │   ├── storageService.js # Image upload/download via Firebase Storage
│   │   └── aiService.js      # OpenAI API calls for bug analysis (optional)
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useBugs.js        # Fetches and subscribes to the bugs collection
│   │   ├── useTestCases.js   # Fetches and subscribes to test cases
│   │   └── useAuth.js        # Returns current user and auth state
│   │
│   ├── constants/            # App-wide constants
│   │   ├── colors.js         # Design token colour palette
│   │   ├── typography.js     # Font sizes, weights, and line heights
│   │   └── statusConfig.js   # Allowed status values and their display colours
│   │
│   └── utils/                # Pure helper functions (no side effects)
│       ├── formatDate.js     # Formats Firestore timestamps for display
│       └── validators.js     # Form validation logic for bug/test case forms
│
├── .env                      # Local environment variables (not committed)
├── .env.example              # Template for required environment variables
├── app.json                  # Expo project configuration
├── eas.json                  # EAS Build profiles (development, preview, production)
├── firebase.rules            # Firestore security rules
└── package.json
```

---

## 🧠 Design Patterns

### State Management — React Hooks (no Redux)

The app uses local component state via `useState` and `useEffect` rather than a global store. The rationale: the data graph is shallow (bugs and test cases are independent lists), there is no complex cross-screen derived state, and a global store would add overhead without meaningful benefit at this scale.

Shared data is accessed through **custom hooks** (`useBugs`, `useTestCases`, `useAuth`), which attach Firestore real-time listeners and return typed state. This keeps screens clean — they call a hook and receive data, loading flags, and error states.

If the app grows to need cross-screen write operations (e.g., a tester assigning a bug from the dashboard that instantly updates the detail screen), the hooks pattern scales naturally by centralising the Firestore listener in a React Context provider.

### Component Design — Atomic + Screen Split

Components are split into two categories:

- **Atomic / shared** components live in `src/components/`. They are stateless or locally stateful, accept props, and are reused across multiple screens. They must never import from `src/services/` directly.
- **Screen** components live in `src/screens/`. They own data fetching (via hooks) and compose atomic components. Each screen maps 1-to-1 to a navigation route.

This boundary keeps atomic components testable in isolation and makes screens easy to reason about.

### Bug Lifecycle

A bug moves through a fixed set of statuses defined in `src/constants/statusConfig.js`. Screens never hardcode status strings — they always reference this config. The config also maps each status to a display colour for `StatusBadge`.

```
Open  →  In Progress  →  Resolved  →  Closed
```

---

## 🔌 API & Service Design

All communication with Firebase and OpenAI lives in `src/services/`. Screens and hooks never import the Firebase SDK directly — they call a service function. This isolates external dependencies and makes services mockable in tests.

### Service Conventions

Each service file follows this structure:

```js
// src/services/bugService.js

import { db } from './firebase';
import { collection, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';

// Returns an unsubscribe function — caller is responsible for cleanup
export const subscribeToBugs = (callback) => { ... };

// Returns the new document reference
export const createBug = async (bugData) => { ... };

// Returns void; throws on failure
export const updateBugStatus = async (bugId, status) => { ... };
```

Rules:
- Service functions are **async** and throw errors on failure; callers handle them.
- Real-time subscriptions return an **unsubscribe function** — hooks call it in `useEffect` cleanup.
- No UI logic (no `Alert`, no navigation) belongs inside a service.

### Firebase Collections

| Collection | Document shape | Notes |
|---|---|---|
| `bugs` | `{ title, description, severity, status, steps, imageUrl, createdAt, updatedAt }` | `imageUrl` points to Firebase Storage |
| `testCases` | `{ title, steps[], expectedResult, actualResult, status, createdAt }` | `status` is `pass`, `fail`, or `pending` |
| `users` | `{ email, displayName, role }` | Role is `tester` or `developer`; used for future RBAC |

### Image Upload Flow

```
User selects image (Expo Image Picker)
  → storageService.uploadImage(uri)
    → Converts URI to blob
    → Uploads to Firebase Storage at bugs/{bugId}/{filename}
    → Returns the public download URL
  → URL stored in the bug document as imageUrl
```

---

## 🧩 Component Library

All shared components live in `src/components/`. The rules for using them:

### `BugCard`

Displays a compact summary of a bug. Used in list views.

```jsx
<BugCard
  title="Login button unresponsive on Android"
  severity="High"
  status="Open"
  createdAt={timestamp}
  onPress={() => navigation.navigate('BugDetail', { bugId })}
/>
```

Props: `title` (string), `severity` (string), `status` (string), `createdAt` (Firestore Timestamp), `onPress` (function).

---

### `StatusBadge`

Renders a pill with a background colour mapped from `statusConfig`. Never pass raw colour values — always pass a status string.

```jsx
<StatusBadge status="In Progress" />
```

Props: `status` (one of `Open | In Progress | Resolved | Closed | pass | fail | pending`).

---

### `ChartWidget`

A thin wrapper around `react-native-chart-kit` that applies the app's colour palette and handles empty states. Use this instead of importing chart-kit directly so chart styles stay consistent.

```jsx
<ChartWidget
  type="bar"
  labels={['Open', 'Resolved', 'Closed']}
  data={[12, 8, 4]}
  title="Bugs by Status"
/>
```

Props: `type` (`bar` | `line` | `pie`), `labels` (string[]), `data` (number[]), `title` (string).

---

### `EmptyState`

Shown when a Firestore collection returns zero documents. Accepts a message and an optional CTA button.

```jsx
<EmptyState
  message="No bugs reported yet."
  actionLabel="Report a Bug"
  onAction={() => navigation.navigate('BugReport')}
/>
```

Props: `message` (string), `actionLabel` (string, optional), `onAction` (function, optional).

---

## 🗺️ Navigation Structure

```
AppNavigator (Root)
├── AuthStack  (shown when user is not logged in)
│   └── LoginScreen
│
└── MainTabs  (shown when user is logged in)
    ├── DashboardScreen
    ├── BugStack
    │   ├── BugListScreen
    │   ├── BugDetailScreen
    │   └── BugReportScreen
    └── TestStack
        ├── TestCaseListScreen
        └── TestCaseDetailScreen
```

`AppNavigator` reads from `useAuth` to decide which navigator to render. Deep-linking into a bug or test case detail is handled by passing params via `navigation.navigate('BugDetail', { bugId })`.
