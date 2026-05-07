# Roadmap

## Vision & Goals
The goal of this project is to provide a simple, fast, and privacy-focused (local-first) web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. We aim to offer an intuitive and highly responsive interface for personal productivity and small-team task management without complex backend setups. Our focus remains on practical, incremental value delivery.

## Current Status
The project has successfully implemented the following core functionalities:
- Create, modify, and delete lists (columns).
- Create, modify, and delete cards within lists.
- Smooth Drag and Drop functionality for moving cards across lists.
- Reliable data persistence leveraging the browser's `localStorage` mechanism.
- Responsive user interface optimized with horizontal scrolling.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Implement accessibility improvements for screen readers and keyboard navigation.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
  - Implement undo/redo functionality for recent actions.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
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

### 5. Undo/Redo Functionality
- User value proposition: Allows users to quickly revert accidental changes, improving confidence and usability.
- Technical approach (high-level): Implement an action history stack that stores the inverse of operations, allowing step-by-step state restoration.
- Success criteria: Users can undo and redo moving cards, deleting items, and editing text using UI buttons or keyboard shortcuts.
- Estimated effort: Medium

## Dependencies & Risks
- **LocalStorage Limitations**: Browser local storage typically limits data to 5MB and can be inadvertently cleared. Transitioning to IndexedDB may be required for extended usage.
- **Vanilla JS Scalability**: Building without a frontend framework increases the risk of complex code. Strict architectural patterns are critical to managing state efficiently.
- **Mobile Compatibility**: The native HTML5 Drag and Drop API often behaves inconsistently on touch devices, which may necessitate polyfills or custom touch event implementations.
