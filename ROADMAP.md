# Roadmap

## Vision & Goals
The primary vision of this project is to create an exceptionally fast, simple, and strictly local-first (privacy-focused) Kanban board. It is entirely developed using vanilla HTML, CSS, and JavaScript. We want to empower individuals and small teams to manage their tasks seamlessly without needing complex cloud setups or databases. The overarching strategy is continuous, incremental value delivery to end users.

## Current Status
At the moment, the core foundation of the application is stable and fully functional:
- Users can reliably create, edit, and delete both lists (boards) and cards.
- Full Drag and Drop functionality is present to effortlessly move cards between different lists.
- Data is securely persisted locally using the standard browser `localStorage` mechanism.
- The interface features a clean, responsive design optimized for horizontal scrolling across various screen sizes.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Implement touch event support to fix Drag and Drop issues on mobile devices.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Introduce mandatory confirmation dialogs before allowing the deletion of lists or cards to prevent accidental data loss.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Add support for colored labels/tags to visually categorize cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Build an automatic sorting mechanism for cards residing within a specific list.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Perform comprehensive CSS refactoring, focusing on CSS variables to improve long-term maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Build a robust JSON Export/Import data functionality to enable users to safely backup and restore their boards.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Implement due dates on cards, featuring distinct visual alerts when a task is approaching its deadline or is already overdue.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop a comprehensive search and filtering system allowing users to find cards by text content or assigned labels.
  - Task Assignment: Allow users to assign individual members or contributors to specific cards.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize heavy DOM manipulation routines to significantly boost rendering performance when handling extremely large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Introduce native support for managing multiple, independent boards within the same application instance.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Roll out extensive theme customization options, specifically introducing a native Dark Mode and alternative color palettes.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Integrate a parser to support standard Markdown formatting within card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Polish the UI by implementing smoother CSS/JS animations when elements like cards are added, removed, or dragged around.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Develop an optional Cloud Sync integration, potentially leveraging BaaS providers (Firebase/Supabase), to seamlessly allow cross-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Add a basic but effective activity log or history view to track recent changes made to the board.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Architect an Internationalization (i18n) framework to allow easy translation of the application into multiple foreign languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Provides users with the peace of mind to manually backup their entire boards to a file, enabling easy transfer of data between completely different browsers or devices while preventing total data loss if the browser cache is cleared.
- Technical approach (high-level): Implement JavaScript utility functions capable of cleanly serializing the active `localStorage` data structure into a standard `.json` file prompt for download. Conversely, implement an HTML5 file input handler to read user-provided `.json` files, validate the schema, and cleanly overwrite the active `localStorage`.
- Success criteria: A user must be able to export their active board to a `.json` file, open a completely fresh browser session (or private window), import the `.json` file, and see their board perfectly restored without any structural errors or missing data.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Empowers power users to cleanly separate and organize drastically different projects, clients, or areas of their life into distinct, isolated Kanban boards instead of cluttering a single workspace.
- Technical approach (high-level): Execute a critical migration of the underlying `localStorage` data structure. The root object must be updated to hold an array or dictionary of independent "board" objects, each containing its own arrays for lists and cards. Develop a new UI component, such as a persistent sidebar or a top-level dropdown menu, to facilitate switching between the active boards.
- Success criteria: A user must be able to create a new board, rename it, delete it, and switch freely between multiple existing boards. Actions taken (creating/moving cards) within one board must strictly never affect or bleed into the data of any other board.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Greatly enhances task tracking by allowing users to set explicit, trackable deadlines directly on their cards, ensuring important tasks are not forgotten as they approach their required completion date.
- Technical approach (high-level): Introduce a standard `<input type="date">` UI element within the detailed card editing modal. Ensure the selected date string is properly appended to and saved within the card's JSON object. Modify the main card rendering loop to check this date against the current system time, conditionally applying custom CSS classes to change the card's background or border color if the deadline is near (e.g., within 24 hours) or actively overdue.
- Success criteria: A user must be able to assign a specific future date to a card and clearly see it displayed on the board interface. The card must automatically display a prominent visual warning (like turning red) when the system date passes the configured due date.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks true mobility by allowing a user to reliably access, modify, and manage the exact same Kanban board concurrently across multiple different devices (such as a smartphone and a desktop PC), keeping data in sync while retaining the speed of the local-first architecture.
- Technical approach (high-level): Integrate a lightweight Backend-as-a-Service (BaaS) SDK such as Firebase Firestore or Supabase. Implement a bidirectional synchronization layer that constantly attempts to push local changes to the cloud when a network connection is detected, and listens for upstream cloud changes to merge back into the local state. Robust conflict resolution logic (e.g., last-write-wins based on timestamps) must be implemented to handle concurrent edits.
- Success criteria: A user logged into the application on two completely separate devices (Device A and Device B) must see that a card created or moved on Device A automatically appears or moves on Device B within a few seconds, provided both devices maintain an active internet connection.
- Estimated effort: Large

### 5. Assign Members to Cards
- User value proposition: Greatly improves team collaboration by clearly delineating responsibilities, allowing anyone to instantly see exactly who is assigned to complete a specific task or card on the board.
- Technical approach (high-level): Update the core card JSON schema to accept and store an array of unique assignee identifiers (IDs). Construct a new user interface section within the card edit modal allowing the user to select from a predefined or dynamic list of team members. Update the main card rendering logic to iterate over the assigned IDs and output visual representations (such as initials or avatar images) directly onto the face of the card.
- Success criteria: A user must be able to successfully open a card, assign one or more specific members to it, and clearly see those members visually represented on the closed card in the main board view.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser `localStorage` implements a hard storage quota (typically around 5MB per origin). It is also highly susceptible to being permanently wiped if a user casually clears their browser's cache or history. If users create extremely large boards with significant text, we will hit these quotas and potentially lose data. We will likely need to research and migrate the storage layer to IndexedDB to accommodate larger data sets.
- Vanilla JS Scalability: As we aggressively add complex new features (multiple boards, cloud sync, sorting), maintaining a purely vanilla JavaScript application without a modern reactive framework (like React or Vue) risks causing the codebase to become overly convoluted, fragile, and difficult for new contributors to understand (technical debt). We will need to enforce very strict architectural patterns to safely manage application state.
- Mobile Compatibility: The native HTML5 Drag and Drop API is notoriously unreliable and inconsistent across different mobile browsers and operating systems. Achieving smooth, native-feeling drag interactions on touchscreens will almost certainly require the integration of a substantial third-party polyfill or the writing of significantly complex, custom touch-event handling logic.
