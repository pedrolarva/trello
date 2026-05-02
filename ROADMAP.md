# Roadmap

## Vision & Goals
Our primary mission with this project is to build a minimal, highly performant, and privacy-first web-based Kanban board. It is constructed completely with plain HTML, CSS, and JavaScript, ensuring a zero-setup local-first experience. By avoiding complex backend infrastructures, we aim to deliver an extremely responsive and intuitive task management application suitable for personal use and small teams, focusing heavily on continuous incremental value delivery.

## Current Status
The application is stable and currently provides foundational Kanban capabilities:
- Support for creating, renaming, and removing Kanban lists.
- Support for creating, modifying, and deleting individual task cards.
- Full Drag and Drop interactions for reordering cards within and across lists.
- Persistent local storage utilizing the browser's `localStorage` API.
- A fully responsive layout that supports horizontal scrolling on smaller displays.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Resolve Drag and Drop inconsistencies on mobile and touch-enabled devices.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Implement safety prompts prior to deleting any lists or cards.
  - [#55](https://github.com/pedrolarva/trello/issues/55) docs: Update ROADMAP.md structure and content.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Introduce color-coded tags and labels for card categorization.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Add automated sorting options for cards within specific lists.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Restructure CSS architecture using custom properties for improved scalability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Build a robust JSON Export/Import feature for reliable local backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Implement due dates alongside visual indicators for tasks approaching their deadlines.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop a comprehensive text and label-based search filtering system.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize DOM rendering cycles to handle an extensive number of cards efficiently.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Engineer architecture to support multiple independent Kanban boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Provide comprehensive theme support, including a built-in Dark Mode.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Integrate standard Markdown parsing for detailed card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Refine CSS transitions for smoother drag and drop interactions.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Integrate optional remote cloud sync capabilities (e.g., Firebase) for cross-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Construct an activity log to track historical changes and actions.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Implement internationalization (i18n) foundations to support diverse languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to create physical backups of their workspaces, facilitating easy transfer across different browsers or hardware devices without losing important information.
- Technical approach: Construct serialization logic to parse the current `localStorage` payload into a structured `.json` format for download. Conversely, implement file reader logic to parse uploaded `.json` files and accurately overwrite the existing local state.
- Success criteria: Users must be able to export their boards as a JSON file and flawlessly import that same file into a completely fresh browser session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Provides the capability to compartmentalize varying workflows, separate projects, or distinguish different life domains into distinct boards.
- Technical approach: Refactor the foundational `localStorage` data schema from a single board model to a robust array-based collection of boards. Construct an intuitive sidebar navigation system to allow seamless transitions between these boards.
- Success criteria: Individuals can effortlessly instantiate, rename, destroy, and alternate between independent boards with absolute data isolation.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Delivers immediate visual feedback on task deadlines directly from the main board view, enhancing time management.
- Technical approach: Append a standard HTML date selector within the detailed card editing interface. Persist the chosen date string within the specific card's data schema. Implement dynamic styling logic to alter the card's visual appearance when a task is near or past its due date.
- Success criteria: Users can assign a deadline via the modal, and the UI correctly highlights tasks that are nearing expiration or are completely overdue.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Breaks the boundaries of a single device, allowing real-time, multi-platform access to boards while preserving the lightning-fast offline-first architecture.
- Technical approach: Evaluate and integrate a lightweight Backend-as-a-Service (BaaS) provider such as Firebase. Architect a synchronization engine that continuously merges local state with the remote datastore, incorporating intelligent conflict resolution when network connectivity fluctuates.
- Success criteria: Board modifications are reliably synchronized across at least two disparate clients authenticated with the same credentials.
- Estimated effort: Large

## Dependencies & Risks
- LocalStorage Limitations: Browser-based local storage is frequently capped at around 5MB and is highly susceptible to accidental deletion by users clearing browser cache. A future migration to IndexedDB might be necessary to accommodate growing datasets.
- Vanilla JS Scalability: As feature complexity increases, adhering strictly to vanilla JavaScript without modern frameworks may significantly compound technical debt. Establishing rigorous architectural conventions early is critical to maintaining a clean codebase.
- Mobile Compatibility: The native HTML5 Drag and Drop API exhibits notoriously erratic behavior on mobile platforms. Addressing these inconsistencies may necessitate complex custom touch-event handling or the integration of robust external polyfills.
