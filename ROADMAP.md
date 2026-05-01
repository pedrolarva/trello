# Roadmap

## Vision & Goals
The objective of this project is to create and maintain a simple, lightning-fast, and completely privacy-focused (local-first) Kanban board application on the web. It is built strictly with vanilla HTML, CSS, and JavaScript. We aim to provide users with an intuitive, highly responsive interface for personal productivity and small-team task management without imposing complex backends, focusing on seamless incremental value delivery.

## Current Status
At present, the project has established robust core functionalities:
- Creating, modifying, and deleting distinct lists (boards).
- Creating, modifying, and deleting individual cards within those lists.
- Full Drag and Drop support to effortlessly move cards between different lists.
- Reliable data persistence leveraging the browser's native `localStorage`.
- A fully responsive design featuring seamless horizontal scrolling on smaller screens.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards to prevent accidental data loss.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Implement colored labels and custom tags for enhanced card categorization.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list based on priority or due date.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and overall maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for reliable backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks to improve time management.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or applied label.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on exceptionally large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Comprehensive support for managing multiple distinct boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization including Dark Mode and diverse color palettes.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Full Markdown support in card descriptions for richer text formatting.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Introduce smoother UI animations when adding, removing, or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow seamless multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log and history tracking for card modifications.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) setup to support multiple languages for global accessibility.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to safely back up their boards locally and manually transfer data across browsers or devices, ensuring critical information is preserved if `localStorage` is inadvertently cleared.
- Technical approach (high-level): Implement JavaScript serialization functions to convert the current `localStorage` state into a downloadable `.json` file. Provide a UI file input to ingest a `.json` file, validate the schema, and safely repopulate `localStorage`.
- Success criteria: The user can download their complete board data as a valid JSON file and successfully restore it in a completely clean session without data corruption.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Enables users to effectively separate and organize vastly different projects or life contexts into isolated boards without clutter.
- Technical approach (high-level): Refactor the core data structure in `localStorage` to handle an array of individual board objects, each maintaining its own discrete lists and cards. Introduce a navigation sidebar or dropdown menu to facilitate swift switching between active boards.
- Success criteria: The user can seamlessly create, rename, delete, and switch between multiple boards, with absolute data isolation confirming no bleeding of lists or cards across boards.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Allows users to establish and monitor task deadlines directly on their cards for better temporal organization.
- Technical approach (high-level): Incorporate a date-picker input field within the card edit modal interface. Persist the chosen date within the card's local object structure. Adapt the card's rendering logic to display the formatted date and automatically adjust styling (e.g., color shifts) when deadlines are nearing or breached.
- Success criteria: The user can reliably assign a due date, view it prominently on the card, and instantly identify overdue tasks via clear visual indicators.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Facilitates dynamic, real-time usage of the same Kanban board across disparate devices (mobile and desktop) while strictly preserving robust offline functionality.
- Technical approach (high-level): Integrate a Backend as a Service (BaaS) provider such as Firebase Firestore. Develop synchronization logic that pushes and pulls local data modifications with the cloud endpoint when network connectivity is detected, incorporating comprehensive conflict resolution strategies.
- Success criteria: Board data synchronizes autonomously, rapidly, and accurately between two distinct active devices authenticated under the identical account.
- Estimated effort: Large

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage typically imposes a strict size quota (around 5MB) and remains vulnerable to accidental erasure if the user purges browser data. An eventual transition to IndexedDB may be investigated to accommodate larger payloads.
- Vanilla JS Scalability: Evolving the project without adopting a modern frontend framework could result in complex, convoluted code that becomes increasingly difficult to maintain. Establishing a clear, disciplined architectural pattern is paramount to effectively managing application state.
- Mobile Compatibility: The native HTML5 Drag and Drop API frequently exhibits erratic or inconsistent behavior across mobile browsers. Achieving reliable touch interactions will likely mandate the integration of polyfills or extensive custom touch event handling logic.
