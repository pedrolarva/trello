# Roadmap

## Vision & Goals
The primary vision of this project is to deliver a highly responsive, local-first web-based Kanban board utilizing only vanilla HTML, CSS, and JavaScript. We aim to provide an intuitive interface for personal and small-team task management that prioritizes privacy, speed, and incremental value delivery without requiring complex backend setups.

## Current Status
At present, the project successfully implements core Kanban functionalities:
- Create, edit, and delete lists (boards) with ease.
- Create, edit, and delete individual cards.
- Seamless Drag and Drop functionality for moving cards across lists.
- Reliable data persistence leveraging the browser's `localStorage`.
- A fully responsive design supporting horizontal scrolling for larger boards.

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
  - Subtasks or checklists within individual cards.
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
- User value proposition: Allows users to securely back up their board states and manually transfer data between browsers or devices, mitigating the risk of data loss if `localStorage` is cleared.
- Technical approach (high-level): Develop robust functions to serialize the active `localStorage` state into a downloadable `.json` file. Implement a file input mechanism to parse a `.json` file and safely restore `localStorage`.
- Success criteria: The user can successfully download their full data as a JSON file and accurately restore it in a fresh session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Empowers users to categorize and organize distinct projects or life domains into entirely separate boards for better focus.
- Technical approach (high-level): Upgrade the `localStorage` data structure to handle an array of board objects, each isolating its own lists and cards. Introduce a sidebar or dropdown UI for seamless board switching.
- Success criteria: The user can create, rename, delete, and switch between multiple boards with complete data isolation.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Enables users to actively track critical task deadlines directly on the face of the card.
- Technical approach (high-level): Integrate a date input field into the card editing modal. Persist this date within the card's data object. Enhance the card UI to display the deadline and dynamically shift colors for approaching or overdue tasks.
- Success criteria: The user can assign a deadline, view it prominently on the card, and quickly spot overdue items through clear visual indicators.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks the ability to manage the same board concurrently across multiple devices (e.g., mobile and desktop) while preserving core offline capabilities.
- Technical approach (high-level): Integrate a lightweight BaaS (Backend as a Service) solution such as Firebase Firestore. Implement background syncing of local data with the cloud whenever an active internet connection is detected, including basic conflict resolution.
- Success criteria: Board state is consistently and automatically synchronized between two distinct devices authenticated to the same account.
- Estimated effort: Large

### 5. Subtasks
- User value proposition: Allows users to break down complex tasks into smaller, manageable subtasks directly within a card.
- Technical approach (high-level): Add an array of subtask objects (id, title, completed status) to the card data structure. Update the card modal to support adding, toggling, and deleting subtasks.
- Success criteria: Users can add multiple subtasks to a card and check them off independently.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage typically enforces a 5MB size limit and can be inadvertently cleared by the user. Exploring IndexedDB may be necessary to support larger datasets and attachments.
- Vanilla JS Scalability: As the application scales, relying purely on vanilla JavaScript without frameworks could increase complexity and technical debt. Establishing a rigorous architectural pattern will be vital for sustainable state management.
- Mobile Compatibility: The native HTML5 Drag and Drop API exhibits inconsistencies across mobile platforms, which may necessitate the integration of polyfills or extensive custom touch event logic to ensure a smooth mobile experience.
