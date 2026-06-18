# Roadmap

## Vision & Goals
Our primary vision for this project is to deliver a highly performant, simple, and strictly privacy-focused (local-first) web-based Kanban board built solely using vanilla HTML, CSS, and JavaScript. We aim to empower users with an intuitive, fluid, and responsive task management interface tailored for personal productivity or small-team collaboration, completely eliminating the need for complex configurations, external databases, or backend servers. A core tenet of our strategy is maintaining a focus on continuous, incremental value delivery.

## Current Status
The project has successfully established a robust foundation, with the following core functionalities fully implemented and operational:
- Seamless creation, modification, and deletion of lists (representing board columns).
- Intuitive card management, allowing users to create, edit, and remove task cards.
- Fluid Drag and Drop interactions for reordering cards and moving them across lists.
- Reliable, local-first data persistence leveraging the browser's native `localStorage` API.
- A fully responsive, mobile-friendly design featuring horizontal scrolling for extensive boards.

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
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Subtask Checklists on Cards (Allow users to break down tasks into sub-items).
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

### 5. Subtask Checklists
- User value proposition: Enables users to break down complex tasks into smaller, manageable sub-items directly on the card, tracking progress more Granularly.
- Technical approach (high-level): Introduce an array of checklist items to the card object in `localStorage`. Update the card modal UI to render checklist inputs, checkboxes, and a progress bar. Ensure state updates are saved when checkboxes are toggled.
- Success criteria: Users can add, remove, and check/uncheck subtasks on a card, with visual indicators of overall completion progress.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage is subject to strict size constraints (typically around 5MB) and is vulnerable to accidental deletion if a user clears their browser data. Exploring alternatives like IndexedDB may be necessary for supporting extensive datasets.
- Vanilla JS Scalability: As the application continues to grow, maintaining a completely framework-less architecture presents a risk of technical debt. Without a robust, declarative rendering engine, our DOM manipulation and state management logic could become excessively complex. Establishing a strict architectural pattern is essential.
- Mobile Compatibility: Leveraging native HTML5 Drag and Drop APIs often yields inconsistent or broken behaviors on touch-based mobile devices. We anticipate needing to implement robust polyfills or engineer custom touch-event handling to ensure a seamless mobile experience.
