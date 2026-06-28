# Roadmap

## Vision & Goals
The primary objective of this project is to deliver a lightweight, high-performance, and privacy-centric (local-first) web-based Kanban board. Built purely with vanilla HTML, CSS, and JavaScript, it provides a highly intuitive and responsive user experience for personal and small-team task management without requiring any backend infrastructure or complex configurations. Our focus remains on delivering incremental value consistently.

## Current Status
At present, the project has established its core foundation, including:
- Creating, editing, and deleting lists (boards).
- Creating, editing, and deleting cards.
- Drag-and-drop functionality for moving cards across lists.
- Reliable data persistence utilizing the browser's `localStorage`.
- A fully responsive design featuring horizontal scrolling.

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
  - [#17] Board Templates for quick initialization.
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
- User value proposition: Empowers users to create backups of their boards and seamlessly transfer data between browsers or devices manually, safeguarding their information if `localStorage` is cleared.
- Technical approach (high-level): Develop functions to serialize the current `localStorage` state into a downloadable `.json` file. Implement a file input mechanism to read a `.json` file and repopulate `localStorage`.
- Success criteria: The user can successfully download their complete data as a JSON file and accurately restore it in a fresh session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Significantly improves organization by allowing users to separate different projects or life areas into distinct, isolated boards.
- Technical approach (high-level): Restructure the data schema in `localStorage` to support an array of boards, with each containing its own nested lists and cards. Implement a sidebar menu or dropdown interface to facilitate switching between boards.
- Success criteria: The user can create, rename, delete, and switch between various boards without any data overlapping or mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Enables users to efficiently track task deadlines directly on individual cards.
- Technical approach (high-level): Introduce a date input field within the card edit modal. Store this date within the card's data object. Modify the card's UI to display the date and apply color changes if the deadline is imminent or has passed.
- Success criteria: The user can set a date, view it clearly on the card, and quickly identify overdue tasks through visual indicators.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Allows users to access and interact with the same board across multiple devices (e.g., mobile and PC) in real-time, while still preserving offline capabilities.
- Technical approach (high-level): Integrate a BaaS (Backend as a Service) platform such as Firebase Firestore. Establish synchronization between local data and the cloud when internet connectivity is present, utilizing robust conflict resolution strategies.
- Success criteria: Data is seamlessly and accurately synchronized between two distinct devices authenticated into the same account.
- Estimated effort: Large

### 5. Board Templates ([#17])
- User value proposition: Saves users time by providing pre-configured board structures (e.g., Agile Sprint, Weekly Planner) to quickly start new projects.
- Technical approach (high-level): Define predefined board JSON structures in a constants file. Provide a UI option when creating a new board to select a template, which populates the new board with the template's lists and dummy cards.
- Success criteria: Users can choose a template during board creation and immediately see a populated board structure ready for use.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage imposes a size limit (typically around 5MB) and can be inadvertently cleared by the user when deleting browser data. Transitioning to IndexedDB may be necessary for larger capacity requirements.
- Vanilla JS Scalability: Building and maintaining the project without modern frameworks may introduce complexity and technical debt as the application expands. Adopting a clear architecture pattern is essential for effective state management.
- Mobile Compatibility: Native HTML5 Drag and Drop features often exhibit inconsistent behavior on mobile devices, potentially necessitating polyfills or extensive custom touch event handling.
