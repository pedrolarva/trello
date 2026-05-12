# Roadmap

## Vision & Goals
The primary purpose of this project is to deliver a fast, simple, and privacy-oriented (local-first) web-based Kanban board created entirely with vanilla HTML, CSS, and JavaScript. It is designed to provide an intuitive and highly responsive interface for personal or small-team task management, eliminating the need for complex setups or backend infrastructure. Our core focus remains on incremental value delivery and keeping the tool lightweight.

## Current Status
The project currently has the following core features implemented and functional:
- Creation, editing, and deletion of lists (representing distinct workflow stages).
- Creation, editing, and deletion of individual task cards.
- Drag-and-drop functionality to seamlessly move cards between lists.
- Reliable data persistence utilizing the browser's `localStorage` API.
- A fully responsive design featuring horizontal scrolling for the board layout.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Resolve bugs related to Drag and Drop on mobile devices (improving touch event handling).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Implement confirmation dialogs before allowing the deletion of lists or cards to prevent accidental data loss.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Introduce colored labels and tags to better categorize cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Add functionality for the automatic sorting of cards within any given list.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Perform CSS refactoring to increase the use of variables, thereby improving overall maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Introduce Export/Import data (JSON format) functionality for robust user backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Add support for due dates on cards, incorporating visual alerts to easily spot overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop a search and filter mechanism for finding cards by text content or applied label.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize DOM manipulation routines to ensure consistent performance on extensively populated large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Integrate native support for managing multiple distinct boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Provide robust theme customization capabilities (including a dedicated Dark Mode and diverse color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Enable Markdown support directly within card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Implement smoother visual animations when adding or relocating items across the UI.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Develop an optional Cloud Sync integration (utilizing services like Firebase or Supabase) to seamlessly support multi-device workflows.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Introduce a simple, accessible activity log and history tracking for changes.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Establish internationalization (i18n) structures to effectively support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to safely back up their boards and manually transfer data across browsers or devices, ensuring critical information is preserved even if `localStorage` is completely cleared.
- Technical approach (high-level): Develop specialized functions to serialize the current `localStorage` state into a downloadable `.json` file. Concurrently, implement a file input interface capable of reading an uploaded `.json` file to safely overwrite and update `localStorage`.
- Success criteria: The end user must be able to download all current board data as a valid JSON file and successfully restore it into a completely fresh session without errors.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Massively aids in workflow organization by allowing distinct projects or major life areas to be separated into dedicated boards.
- Technical approach (high-level): Restructure the existing data schema in `localStorage` to support an array structure for boards, where each specific board independently encapsulates its own related lists and cards. Additionally, create a user-friendly sidebar menu or dropdown interface to rapidly toggle between active boards.
- Success criteria: The user can successfully create, dynamically rename, intentionally delete, and quickly switch between entirely different boards without any risk of data mixing or leakage.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Provides a straightforward method for users to actively track and manage task deadlines directly via the card interface.
- Technical approach (high-level): Introduce a standard date input field inside the card editing modal. Ensure the selected date is correctly serialized into the card's underlying JSON object. Update the main card UI to persistently display the selected date, incorporating logic to dynamically alter the text color if the deadline is either approaching or currently overdue.
- Success criteria: The user can assign a valid date, reliably view it on the main card exterior, and instantaneously identify any overdue tasks via prominent visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks the ability to utilize the exact same board structure seamlessly across multiple varied devices (e.g., mobile and desktop PC) in real-time, all while preserving the core local-first offline functionality.
- Technical approach (high-level): Implement integration with a modern BaaS (Backend as a Service) platform such as Firebase Firestore. Establish background synchronization logic to continuously sync local device data with the cloud whenever an active internet connection is successfully detected, employing robust conflict resolution strategies.
- Success criteria: All board data must be automatically and accurately synchronized between two entirely separate devices that are actively logged into the same synchronized account.
- Estimated effort: Large

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage typically imposes a strict size limit (often around 5MB) and remains vulnerable to being accidentally wiped by the user when routinely clearing browser data. We may ultimately need to investigate adopting IndexedDB to support much larger storage limits.
- Vanilla JS Scalability: Scaling the project without leveraging modern frontend frameworks may cause the raw JavaScript code to become overly complex and difficult to maintain over time (accruing technical debt). Implementing a much clearer architectural pattern will eventually be strictly required to manage application state effectively.
- Mobile Compatibility: Relying entirely on native HTML5 Drag and Drop APIs can yield highly inconsistent behavior across different mobile devices, which may necessitate the introduction of specific polyfills or a significant rewrite incorporating custom touch event handling.
