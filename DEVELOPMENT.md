# 🛠️ DEVELOPMENT.md — Engineer's Guide

Everything you need to go from a fresh clone to a running app on both Android and iOS.

---

## 📋 Prerequisites

Ensure the following tools are installed before you begin:

| Tool | Version | Notes |
|---|---|---|
| Node.js | `>= 18.x` | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| npm | `>= 9.x` | Comes with Node.js |
| Expo CLI | Latest | `npm install -g expo-cli` |
| EAS CLI | Latest | `npm install -g eas-cli` (for builds) |
| Watchman | Latest | macOS only — `brew install watchman` |
| Xcode | `>= 15` | iOS only — install from the Mac App Store |
| CocoaPods | `>= 1.12` | iOS only — `sudo gem install cocoapods` |
| Android Studio | Latest | Android only — includes the Android SDK and emulator |
| Java (JDK) | `>= 17` | Android only — required by the Android build toolchain |
| Firebase CLI | Latest | `npm install -g firebase-tools` |

---

## 🔐 Environment Variables

Create a `.env` file in the project root by copying the example:

```bash
cp .env.example .env
```

Then fill in the values below:

| Variable | Description | Where to Get It |
|---|---|---|
| `FIREBASE_API_KEY` | Firebase project API key | Firebase Console → Project Settings → General |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console → Project Settings → General |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings → General |
| `FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket URL | Firebase Console → Storage → Get Started |
| `FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID | Firebase Console → Project Settings → Cloud Messaging |
| `FIREBASE_APP_ID` | Firebase app ID | Firebase Console → Project Settings → General |
| `OPENAI_API_KEY` | OpenAI API key *(optional)* | [platform.openai.com](https://platform.openai.com) |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🚀 Step-by-Step Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-org/mobile-testing-playground.git
cd mobile-testing-playground
npm install
```

### 2. Configure Firebase

- Create a project at [Firebase Console](https://console.firebase.google.com)
- Enable **Firestore**, **Authentication** (Email/Password), and **Storage**
- Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
- Place them in the project root (they are referenced by `app.json`)

### 3. Start the development server

```bash
npx expo start
```

This opens the Expo Dev Tools in your browser. From here you can:

- Press `a` to open on an Android emulator
- Press `i` to open on the iOS simulator (macOS only)
- Scan the QR code with Expo Go on a physical device

---

### Android-specific setup

```bash
# Start an Android emulator first (via Android Studio AVD Manager), then:
npx expo run:android
```

Ensure `ANDROID_HOME` is set in your shell profile:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk          # macOS
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

### iOS-specific setup

```bash
# Install CocoaPods dependencies
npx pod-install

# Run on simulator
npx expo run:ios
```

If you see a simulator trust prompt, go to **Settings → General → VPN & Device Management** and trust the developer certificate.

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage report
npm test -- --coverage
```

Test files live alongside source files with a `.test.js` or `.spec.js` suffix (e.g., `BugService.test.js`).

### End-to-End Tests (Detox)

```bash
# Build the Detox test binary (run once)
npx detox build --configuration android.emu.debug

# Run E2E tests
npx detox test --configuration android.emu.debug
```

> iOS Detox config uses `ios.sim.debug`. Ensure your simulator is booted before running.

### Manual Testing Checklist

Before opening a PR, verify the following flows manually:

- [ ] User can register and log in
- [ ] Bug can be created with an image attachment
- [ ] Bug status transitions work correctly
- [ ] Test case can be created, executed, and marked Pass/Fail
- [ ] Dashboard charts render with accurate data

---

## 🐛 Troubleshooting

### Metro Bundler cache issues

If you see stale module errors or unexpected behaviour after pulling new changes:

```bash
npx expo start --clear
```

Or force-clear the cache manually:

```bash
rm -rf node_modules/.cache
watchman watch-del-all
npm install
npx expo start --clear
```

---

### `Unable to resolve module` error

This usually means a dependency is missing or node_modules is corrupted:

```bash
rm -rf node_modules
npm install
npx expo start --clear
```

---

### Android: `SDK location not found`

Create a `local.properties` file inside the `android/` directory:

```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

---

### iOS: CocoaPods `pod install` fails

```bash
sudo gem install cocoapods
npx pod-install
```

If that still fails, try:

```bash
cd ios && pod deintegrate && pod install
```

---

### Firebase: `permission-denied` on Firestore

Check your Firestore security rules in the Firebase Console. For development, you can temporarily use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> ⚠️ Lock down rules before deploying to production.

---

### Expo Go: Image picker not working on physical device

Ensure the following permission is declared in `app.json`:

```json
"plugins": [
  ["expo-image-picker", { "photosPermission": "Allow access to upload bug screenshots." }]
]
```

Then rebuild the development client:

```bash
npx expo prebuild
npx expo run:android   # or run:ios
```
