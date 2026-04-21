# The Mobile Testing Playground - Comprehensive Guide and Explanations

This document serves as an overarching encyclopaedia for your application. It explains why we use Supabase, what every single file in the project does, and maps out the exact flow of how a user operates the application.

---

## 1. Why are we using Supabase?
Supabase is an open-source alternative to Firebase. We are using it as the core backend of your app for several massive benefits:
* **The Generous Free Tier**: Supabase is widely known for offering a robust free tier with no hidden surprises, making it ideal for indie projects and startups.
* **PostgreSQL Engine**: Unlike Firebase which uses "NoSQL" documents, Supabase uses PostgreSQL. It is a highly structured SQL database, making it extremely easy to query complex relationships (e.g. "Find all bugs assigned to User X that were reported on an iPhone 14").
* **All-in-One Solution**: Supabase handles your Database (storing bugs/tests), Authentication (login/passwords), and Storage (uploading bug screenshots), meaning you don't need to juggle multiple backend tools.

*Do you need to write code for storing data?*
**Yes.** Currently, your application is running entirely on "Mock Data" (hardcoded items in your code) so you can interact with the app and see how it feels without an internet connection or backend connection. Eventually, when you are ready to make the app "live", you will need to replace the `TODO` comments inside `src/services/bugService.js` with code that actually sends the bug data to Supabase using `supabase.from('bugs').insert(...)`.

---

## 2. Explanation of Every File and Technology

### Root Files (The Core Movers)
* `App.js` & `index.js`: The starting points of your mobile app. Expo boots up `index.js`, which then loads `App.js`. 
* `package.json`: A list of all the extra power-ups (dependencies) your app installs (like `react-navigation` to move between screens, or `@supabase/supabase-js` to talk to the database).
* `app.json`: Configuration for Expo (how the app is named, your app icon, and permissions like accessing the camera).
* `.env` / `.env.example`: The secret vault where your API keys for Supabase live.

### `src/components/` (The Lego Blocks)
These are small UI pieces reused constantly throughout the app to keep your code clean.
* `BugCard.jsx`: The small rectangular box showing a bug's title and severity. Seen in lists.
* `StatusBadge.jsx`: The colored pills that say "Open", "Resolved", etc.
* `ChartWidget.jsx`: Takes in numbers and renders the visual Bar/Line charts on your dashboard.
* `EmptyState.jsx`: The friendly graphic shown when a list is completely empty.

### `src/screens/` (The Interactive Pages)
These are the actual pages a user sees.
* `LoginScreen.jsx`: Where a team member enters their email and password to access the app.
* `DashboardScreen.jsx`: The homepage. Shows charts displaying "Bug Trends" and "Tester Performance".
* `BugListScreen.jsx`: A scrollable list of all reported bugs. It features a "Select Items" mode to select multiple bugs and resolve them at the same time.
* `BugDetailScreen.jsx`: The deep-dive page for a single bug. Shows the bug's description, the device it happened on (Device Metadata), and a Slack-like Activity Feed showing comments and mentions.
* `BugReportScreen.jsx`: A form where a tester fills out the title, severity, description, and attaches a screenshot to create a new bug.
* `TestCaseListScreen.jsx` & `TestCaseDetailScreen.jsx`: Pages dedicated to tracking QA tests, where testers mark if a test passed or failed.
* `SettingsScreen.jsx`: The Integration control center where users toggle Mock GitHub/Jira/Slack connections.

### `src/navigation/` (The Map)
* `AppNavigator.jsx`: Controls the bottom tab bar on your phone screen (Dashboard | Bugs | T.Cases | Settings).
* `BugStack.jsx` & `TestStack.jsx`: Handles allowing users to click a bug in the list and slide over to the detail view.

### `src/services/` (The Backend Engines)
These files act as the middle-men. Your screens ask these files to fetch data, and these files talk to Supabase.
* `supabase.js`: Sets up the connection to your Supabase server using your secret keys.
* `bugService.js` & `testCaseService.js`: Contains functions like `createBug()` and `subscribeToBugs()`. Right now they return fake data, but eventually, they will push data to Supabase.
* `mockData.js`: A massive file full of hardcoded JSON data powering the charts, activity feeds, and device metadata you currently see in the UI.
* `storageService.js`: Responsible for taking an image from your phone gallery and uploading it to Supabase Storage.
* `aiService.js`: *Optional setup* for hooking into ChatGPT in the future to auto-summarize bugs.

---

## 3. How a User Operates the Application (User Journey)

Imagine a Quality Assurance (QA) Tester named **Sarah** using your application.

1. **Authentication:** 
   Sarah opens the app and lands on the `LoginScreen`. She enters her credentials, and the app connects to Supabase Auth to verify her.
2. **Reviewing the Dashboard:**
   Sarah lands on the `DashboardScreen`. She looks at the charts and sees the `Bug Trends` line graph is spiking for the week, and checks the `Tester Performance` bar chart to see she leads the team in discovering bugs.
3. **Discovering a New Bug:**
   While testing your company's software, Sarah finds a crash. She taps the 'Bugs' tab on the bottom menu to go to the `BugListScreen`, and presses "Report Bug". 
   She is sent to the `BugReportScreen`. She types the bug title, adds a picture of the crash using `storageService.js`, and hits Submit.
4. **Investigating a Bug:**
   Later, a Developer named **John** opens the app and sees Sarah's bug in the `BugListScreen`. He taps it to open the `BugDetailScreen`.
   John reads the description. He then checks the **Device Metadata** section on the screen, seeing that Sarah experienced the crash on an `"iPhone 14 Pro"`.
   John scrolls down to the **Activity & Comments Feed**. He writes a comment: *"@Sarah, investigating this now!"*
5. **Resolving the Bugs:**
   John fixes the crashes. He goes back to the `BugListScreen`, taps "Select Items" at the top right, taps the 3 bugs he fixed, and hits the magic "Resolve Selected" button at the bottom to bulk-close them in one go!
