# 🧪 Mobile Testing Playground

A cross-platform mobile application that centralizes bug reporting, test case management, and issue tracking — bringing real-world QA workflows to your fingertips.

---

## ✨ Key Features

- **Bug Reporting** — Submit bugs with title, description, severity, steps to reproduce, and screenshots
- **Bug Lifecycle Management** — Track status transitions: `Open → In Progress → Resolved → Closed`
- **Test Case Manager** — Create structured test cases with steps, expected results, and actual outcomes
- **Pass/Fail Execution** — Mark test cases during execution for systematic validation
- **Analytics Dashboard** — Visualize total bugs, resolution rates, and test case success metrics via charts
- **Image Attachments** — Capture and upload screenshots directly from the device camera or gallery
- **User Authentication** — Secure login and role-based access via Supabase Auth
- **Real-time Sync** — All data is stored and retrieved in real time via Supabase PostgreSQL
- **AI Bug Analysis** *(optional)* — Intelligent severity prediction via OpenAI API integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native |
| Navigation | React Navigation (Stack + Tab) |
| Backend & Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| Image Handling | Expo Image Picker |
| Data Visualization | react-native-chart-kit |
| AI Integration | OpenAI API *(optional)* |

---

## ⚡ Quick Start

### 📋 Prerequisites
1. **Node.js** installed on your system.
2. *(Optional)* **Expo Go** app installed on your physical mobile device if you want to test on your phone.
3. *(Optional)* **Xcode** for iOS Simulator (Mac only) or **Android Studio** for Android Emulator.

### 🛠️ Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinsmoke0003/Testing-Playground.git
   cd Testing-Playground
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app!**
   Choose your preferred platform below.

#### 📱 For iOS Users
- **Using a physical device (Easiest):**
  1. Run `npx expo start` in your terminal.
  2. Open your iPhone's Camera app and scan the QR code that appears in the terminal.
  3. Open the link in the "Expo Go" app.
- **Using an iOS Simulator (Mac only):**
  1. Ensure you have Xcode installed.
  2. Run `npm run ios` or press `i` in the terminal after running `npx expo start`.

#### 💻 For Desktop / Android Users
- **Using Web Browser (Desktop users):**
  1. Run `npm run web` or press `w` in the terminal after running `npx expo start`.
  2. The app will open in your default web browser.
- **Using an Android Emulator:**
  1. Open Android Studio and start an Android Virtual Device (AVD).
  2. Run `npm run android` or press `a` in the terminal after running `npx expo start`.

> See [DEVELOPMENT.md](./DEVELOPMENT.md) for full setup instructions, environment variables, and platform-specific steps.

---

## 🚀 Deployment

### Android (Play Store)
```bash
eas build --platform android --profile production
```
Submit the generated `.aab` file via the [Google Play Console](https://play.google.com/console).

### iOS (App Store)
```bash
eas build --platform ios --profile production
```
Upload the `.ipa` file using Xcode or Transporter, then submit via [App Store Connect](https://appstoreconnect.apple.com).

> Ensure your `app.json` has the correct `bundleIdentifier` (iOS) and `package` (Android) before building. EAS CLI handles signing automatically when configured via `eas.json`.

---

## 📂 Project Docs

| File | Purpose |
|---|---|
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Setup guide, environment config, testing, and troubleshooting |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Folder structure, design patterns, API design, and component library |

---

## 📄 License

MIT © 2025 Mobile Testing Playground Contributors
