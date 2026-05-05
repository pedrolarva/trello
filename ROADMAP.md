# Roadmap

## Vision & Goals
The primary goal of this project is to provide a highly performant, simple, fast, and privacy-focused (local-first) web-based Kanban board. Built completely with vanilla HTML, CSS, and JavaScript, it ensures minimal dependencies while providing a robust set of task management features. It aims to offer an intuitive, deeply accessible, and responsive interface tailored for personal productivity or small-team task management without the overhead of complex configurations, databases, or third-party backends. Focus is rigorously maintained on incremental value delivery, allowing users to experience continuous improvements.

## Current Status
The project currently has a solid foundation with several core functionalities fully implemented and stable:
- Robust list management allowing users to create, edit, and safely delete lists (boards).
- Comprehensive card operations to create, edit, and securely delete cards within any list.
- Seamless Drag and Drop functionality to reorganize cards dynamically and move them effortlessly between lists.
- Reliable data persistence leveraging the browser's native `localStorage` for an immediate, offline-first experience.
- A fully responsive design pattern prioritizing horizontal scrolling, ensuring usability across varying screen sizes and devices.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
  - Implement accessible keyboard navigation across all lists and cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Add inline editing for card titles directly from the board view.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
  - Introduce an archive system for completed cards instead of permanent deletion.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.
  - Extract reusable UI components into standalone JavaScript modules.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Implement custom background images for individual boards.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
  - Introduce collaborative real-time editing features using WebSockets.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.
  - Setup comprehensive E2E testing using Playwright.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Allows users to back up their boards and transfer data between browsers or devices manually, ensuring they don't lose information if `localStorage` is cleared.
- Technical approach (high-level): Create functions to serialize the current `localStorage` state into a `.json` file for download. Create a file input to read a `.json` file and update `localStorage`.
- Success criteria: The user can download the complete data as a JSON file and successfully restore it in a clean session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Helps in organizing different projects or life areas into completely separate boards.
- Technical approach (high-level): Update the data structure in `localStorage` to support an array of boards, each containing its own lists and cards. Create a sidebar menu or dropdown to switch between boards.
- Success criteria: The user can create, rename, delete, and switch between different boards without data mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Allows users to track task deadlines directly on the card.
- Technical approach (high-level): Add a date input field in the card edit modal. Save the date in the card object. Update the card interface to display the date and change color if the deadline is approaching or overdue.
- Success criteria: The user can set a date, view it on the card, and easily identify overdue tasks via visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Enables using the same board across different devices (mobile and PC) in real-time while maintaining offline functionality.
- Technical approach (high-level): Utilize a BaaS (Backend as a Service) like Firebase Firestore. Sync local data with the cloud when an internet connection is available, using conflict resolution strategies.
- Success criteria: Data is automatically and correctly synced between two different devices logged into the same account.
- Estimated effort: Large

### 5. Card Archiving System
- User value proposition: Allows users to clean up their active boards by archiving completed or obsolete cards without permanently deleting their data, maintaining a cleaner workspace.
- Technical approach (high-level): Add an 'isArchived' boolean property to the card data schema. Filter out archived cards during the board rendering process and create a separate 'Archive' view to restore or permanently delete them.
- Success criteria: Users can archive a card to remove it from the main view and successfully restore it from a dedicated archive section.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage has a strict size limit (typically 5MB per origin) and can be accidentally wiped by the user when clearing browsing data or cache. We may need to investigate alternative storage APIs like IndexedDB for accommodating larger limits and better durability.
- Vanilla JS Scalability: Maintaining the project's codebase without modern frameworks might make the logic complex and harder to maintain as the application continues to grow, potentially accruing technical debt. A clear, component-like architecture pattern will be required to manage state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop API features can be highly inconsistent or completely non-functional on mobile devices, potentially requiring dedicated polyfills or significant custom touch event handling logic.
