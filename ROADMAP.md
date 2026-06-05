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
  - Card Attachments: Allow attaching images or documents to cards using IndexedDB.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Checklists on Cards: Break down complex cards into smaller subtasks.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
  - Collaborative Editing: Allow multiple users to connect and edit the same board in real-time.
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

### 5. Checklists on Cards
- User value proposition: Enables users to break down complex cards into smaller, manageable subtasks directly within the card, providing a clearer sense of progress.
- Technical approach (high-level): Extend the card data structure to include an array of checklist items (text and completion status). Update the card modal UI to render checklist items, allowing users to add, edit, delete, and toggle them.
- Success criteria: Users can create checklists on a card, toggle subtasks, and see a progress indicator on the front of the card.
- Estimated effort: Medium

### 6. Card Attachments
- User value proposition: Allows users to attach relevant images or documents to their task cards, keeping all related context in one place.
- Technical approach (high-level): Implement file input handling in the card modal to read files as base64 strings or store them via a lightweight local storage mechanism (e.g., IndexedDB since localStorage is too small). Show attachment thumbnails on the card.
- Success criteria: Users can upload an image attachment to a card and see its preview.
- Estimated effort: Large

### 7. Collaborative Editing
- User value proposition: Teams can work together seamlessly without needing to refresh or manually sync changes, avoiding conflicts.
- Technical approach (high-level): Introduce WebSockets or a real-time event system via the backend to broadcast and receive state updates. Implement operational transformation or CRDTs for resolving simultaneous edits.
- Success criteria: Changes made by one user instantly appear on another user's screen viewing the same board.
- Estimated effort: Large

## Dependencies & Risks - Any blockers or concerns
- LocalStorage Limitations: Browser local storage has a size limit (typically 5MB) and can be accidentally wiped by the user when clearing browser data. We may need to investigate IndexedDB for larger limits.
- Vanilla JS Scalability: Maintaining the project without frameworks might make the code complex and harder to maintain as the application grows (technical debt). A clear architecture pattern will be required to manage state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop features can be inconsistent on mobile devices, potentially requiring polyfills or significant custom touch event handling.
- Concurrency Conflicts: With cloud sync and real-time collaboration, handling concurrent edits smoothly without losing data is a significant technical challenge requiring robust conflict resolution logic.
