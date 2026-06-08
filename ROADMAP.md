# Roadmap

## Vision & Goals
Our primary goal for this project is to construct a lightweight, high-performance, and privacy-focused (local-first) web-based Kanban board utilizing vanilla HTML, CSS, and JavaScript. We intend to deliver a highly intuitive, visually appealing, and responsive user experience for personal task tracking and small-team collaboration, completely eliminating the necessity for complex backend infrastructure. The core focus is on incremental value delivery.

## Current Status
The application presently implements the following core functionalities:
- Creating, modifying, and deleting distinct lists (boards).
- Creating, editing, and permanently deleting task cards.
- Drag and Drop functionality enabling users to smoothly move cards between lists.
- Seamless data persistence using the browser's native `localStorage` API.
- Fully responsive design accommodating horizontal scrolling for extended boards.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
  - Checklist support within cards to track sub-tasks.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Enables users to safely back up their boards and manually migrate their data across different browsers or devices, preventing data loss if `localStorage` is cleared.
- Technical approach (high-level): Develop utilities to serialize the application state from `localStorage` into a downloadable `.json` file. Provide a file upload interface to parse a `.json` file and repopulate `localStorage`.
- Success criteria: Users can reliably download their complete dataset as a JSON file and successfully import it into a fresh browser session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Allows users to segregate distinct projects or functional areas into completely independent boards for better organization.
- Technical approach (high-level): Restructure the internal data schema to support an array of board objects, each encapsulating its own lists and cards. Introduce a navigation sidebar or dropdown to facilitate board switching.
- Success criteria: Users can intuitively create, rename, switch between, and delete different boards without data overlap or leakage.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Empowers users to monitor task deadlines and urgency directly from the card view.
- Technical approach (high-level): Incorporate a date picker within the card editing modal. Persist the selected due date in the card's data model. Enhance the card rendering logic to show the date and apply color-coded warnings as the deadline nears or passes.
- Success criteria: Users can assign a due date, see it displayed on the card, and quickly spot overdue tasks through distinct visual styling.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Facilitates seamless cross-device usage (e.g., between mobile and desktop) in real-time, while preserving full offline capabilities.
- Technical approach (high-level): Integrate a Backend as a Service (BaaS) provider such as Firebase Firestore. Implement synchronization logic to push local changes to the cloud and pull remote updates, handling conflict resolution appropriately.
- Success criteria: Data automatically synchronizes across two devices authenticated with the same account, without overwriting recent offline changes.
- Estimated effort: Large

### 5. Checklist Support
- User value proposition: Allows users to break down complex tasks into manageable sub-tasks directly within a single card.
- Technical approach (high-level): Add a checklist array to the card data model. Build a UI in the card modal to add, remove, and toggle checklist items. Display a progress indicator (e.g., 2/5 completed) on the card face.
- Success criteria: Users can create checklist items, toggle their completion status, and view the overall progress on the main board.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage has a size limit (typically 5MB) and can be accidentally wiped by the user when clearing browser data. We may need to investigate IndexedDB for larger limits.
- Vanilla JS Scalability: Maintaining the project without frameworks might make the code complex and harder to maintain as the application grows (technical debt). A clear architecture pattern will be required to manage state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop features can be inconsistent on mobile devices, potentially requiring polyfills or significant custom touch event handling.
