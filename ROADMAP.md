# Roadmap

## Vision & Goals
The goal of this project is to provide a simple, fast, and privacy-focused (local-first) web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. It aims to offer an intuitive and responsive interface for personal or small-team task management without the need for complex setups or backends. Focus is on incremental value delivery.

## Current Status
The project currently has core functionalities implemented:
- Create, edit, and delete lists (boards).
- Create, edit, and delete cards.
- Drag and Drop functionality to move cards between lists.
- Data persistence using the browser's `localStorage`.
- Responsive design with horizontal scrolling.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- **High priority (Bugs, critical features)**
  - Bug fixes for Drag and Drop on mobile devices (touch events) - [#1](#)
  - Add confirmation dialogs before deleting lists or cards - [#2](#)
- **Medium priority (Enhancements, improvements)**
  - Colored labels/tags for cards - [#3](#)
  - Automatic sorting of cards within a list - [#4](#)
- **Low priority (Technical debt, optimizations)**
  - CSS refactoring for better use of variables and maintainability - [#5](#)

### Q2: Data Management and Productivity
- **High priority (Bugs, critical features)**
  - Export/Import data (JSON) functionality for backups - [#6](#)
- **Medium priority (Enhancements, improvements)**
  - Due dates on cards with visual alerts for overdue tasks - [#7](#)
  - Search and filter cards by text or label - [#8](#)
- **Low priority (Technical debt, optimizations)**
  - DOM manipulation optimization for better performance on large boards - [#9](#)

### Q3: Advanced Features and Customization
- **High priority (Bugs, critical features)**
  - Support for multiple boards - [#10](#)
- **Medium priority (Enhancements, improvements)**
  - Theme customization (Dark Mode and color themes) - [#11](#)
  - Markdown support in card descriptions - [#12](#)
- **Low priority (Technical debt, optimizations)**
  - Smoother animations when adding or moving items - [#13](#)

### Q4: Synchronization and Expansion
- **High priority (Bugs, critical features)**
  - Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage - [#14](#)
- **Medium priority (Enhancements, improvements)**
  - Simple activity log / history - [#15](#)
- **Low priority (Technical debt, optimizations)**
  - Internationalization (i18n) to support multiple languages - [#16](#)

## Feature Details

### 1. Export/Import Data ([#6](#))
- **User value proposition:** Allows users to back up their boards and transfer data between browsers or devices manually, ensuring they don't lose information if `localStorage` is cleared.
- **Technical approach (high-level):** Create functions to serialize the current `localStorage` state into a `.json` file for download. Create a file input to read a `.json` file and update `localStorage`.
- **Success criteria:** The user can download the complete data as a JSON file and successfully restore it in a clean session.
- **Estimated effort:** Small
- **Dependencies & Risks:** Browser `localStorage` size limits (typically 5MB) could cause issues with extremely large boards if we don't migrate to IndexedDB eventually. Risk of user wiping their browser data before exporting.

### 2. Support for Multiple Boards ([#10](#))
- **User value proposition:** Helps in organizing different projects or life areas into completely separate boards.
- **Technical approach (high-level):** Update the data structure in `localStorage` to support an array of boards, each containing its own lists and cards. Create a sidebar menu or dropdown to switch between boards.
- **Success criteria:** The user can create, rename, delete, and switch between different boards without data mixing.
- **Estimated effort:** Large
- **Dependencies & Risks:** This requires a significant refactor of how state is loaded and saved. Migrating existing users' single-board data to the new multi-board format must be flawless to avoid data loss.

### 3. Due Dates ([#7](#))
- **User value proposition:** Allows users to track task deadlines directly on the card.
- **Technical approach (high-level):** Add a date input field in the card edit modal. Save the date in the card object. Update the card interface to display the date and change color if the deadline is approaching or overdue.
- **Success criteria:** The user can set a date, view it on the card, and easily identify overdue tasks via visual cues.
- **Estimated effort:** Medium
- **Dependencies & Risks:** Handling timezones and date formats could introduce edge case bugs.

### 4. Optional Cloud Sync ([#14](#))
- **User value proposition:** Enables using the same board across different devices (mobile and PC) in real-time while maintaining offline functionality.
- **Technical approach (high-level):** Utilize a BaaS (Backend as a Service) like Firebase Firestore. Sync local data with the cloud when an internet connection is available, using conflict resolution strategies.
- **Success criteria:** Data is automatically and correctly synced between two different devices logged into the same account.
- **Estimated effort:** Large
- **Dependencies & Risks:** Introduces external dependencies (Firebase/Supabase SDKs), which departs from the "no complex setups" goal. Managing offline/online state and resolving sync conflicts without a dedicated backend might be challenging.

### 5. Bug Fixes for Mobile Drag and Drop ([#1](#))
- **User value proposition:** Allows mobile users to comfortably organize their cards using touch interfaces.
- **Technical approach (high-level):** Native HTML5 Drag and Drop features are often inconsistent on mobile devices. We will need to implement a polyfill or custom touch event handling (`touchstart`, `touchmove`, `touchend`) mapped to drag actions.
- **Success criteria:** A user on a touch device can seamlessly drag a card from one list and drop it into another without screen tearing or unintended scrolling.
- **Estimated effort:** Medium
- **Dependencies & Risks:** Complex touch interactions might conflict with native browser gestures (like swipe-to-go-back or scrolling).
