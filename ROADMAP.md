# Roadmap

## Vision & Goals
Our overarching vision is to provide a fast, secure, and privacy-first (local-focused) Kanban application constructed entirely using pure HTML, CSS, and JavaScript. We intend to deliver a highly accessible and responsive interface tailored for personal task management or small-team collaboration, bypassing the complexity of full backend setups. We prioritize continuous, incremental value delivery to our users.

## Current Status
The application currently supports several core operational features:
- Creation, modification, and deletion of custom lists (acting as boards).
- Seamless generation, editing, and removal of individual task cards.
- Interactive drag-and-drop mechanics for relocating cards between different lists.
- Reliable data storage and persistence utilizing the browser's native `localStorage` API.
- A flexible, responsive design that accommodates horizontal scrolling for improved usability.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Resolve drag-and-drop inconsistencies on mobile devices to improve touch response.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Introduce safeguard confirmation dialogs before users can delete lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Implement colored labels and tagging capabilities for enhanced card categorization.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Enable automated sorting features for cards within any given list.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Restructure CSS architecture to more effectively utilize variables and increase maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Deploy Export/Import functionality (via JSON) to allow users to create manual data backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Integrate due dates on task cards, featuring visual alerts for approaching or overdue items.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop search and filter functionalities to locate cards by text strings or applied labels.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Streamline DOM manipulation processes to guarantee smooth performance on extensively populated boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Roll out comprehensive support for managing multiple, independent boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Introduce aesthetic theme customization options, prominently featuring a Dark Mode and diverse color palettes.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Embed Markdown parsing support directly within card descriptions for enriched text formatting.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Refine user interface animations to provide a more fluid experience when interacting with items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Introduce an optional Cloud Sync feature leveraging platforms like Firebase or Supabase to facilitate multi-device connectivity.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Construct a straightforward activity log or history interface for auditing board changes.
  - Native Desktop Notifications for alerting users about imminent task due dates.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Lay the groundwork for Internationalization (i18n) to support a broader range of global languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to manually safeguard their board configurations and transfer data between different browsers or devices, averting total data loss should `localStorage` be cleared.
- Technical approach (high-level): Engineer serialization routines to export the existing `localStorage` state into a downloadable `.json` file, paired with a file input mechanism to accurately parse and restore data from a `.json` upload back into `localStorage`.
- Success criteria: A user can effortlessly download their complete application state as a JSON file and flawlessly reinstate it within a completely fresh browser session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Greatly enhances organizational capacity by allowing users to partition disparate projects or life domains into their own entirely isolated boards.
- Technical approach (high-level): Overhaul the underlying `localStorage` schema to accommodate an array of boards (where each board maintains its own distinct lists and cards), and construct a sidebar or dropdown navigation interface to seamlessly swap active contexts.
- Success criteria: Users possess the ability to intuitively create, modify, delete, and toggle between separate boards without any unintended data crossover.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Equips users with the capability to directly track critical task deadlines and schedules from the primary card interface.
- Technical approach (high-level): Integrate a robust date input selector into the card modification modal, serialize the chosen date within the card's data model, and dynamically refresh the card's visual state to reflect impending or past-due statuses via distinct color highlights.
- Success criteria: Users can reliably assign a date, visually confirm its presence on the card, and instantaneously recognize overdue obligations through clear visual indicators.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Delivers the flexibility to utilize a unified board across multiple physical devices (such as mobile phones and desktop computers) in real-time, all while preserving the application's robust offline capabilities.
- Technical approach (high-level): Implement a Backend as a Service (BaaS) solution, such as Firebase Firestore, designed to synchronize localized data against a cloud repository upon establishing internet connectivity, incorporating intelligent conflict resolution algorithms.
- Success criteria: Local data modifications are swiftly, automatically, and accurately replicated across at least two distinct devices authenticated under the same user profile.
- Estimated effort: Large

### 5. Native Desktop Notifications
- User value proposition: Guarantees users remain informed of critical impending deadlines by dispatching native system-level alerts, functioning even when the application tab is minimized or hidden in the background.
- Technical approach (high-level): Leverage the standard browser Notification API to solicit user consent and programmatically trigger alerts based on upcoming card due dates, evaluated through a continuous background polling interval.
- Success criteria: Users receive prompt, highly visible desktop notifications for tasks approaching their due dates, provided notification permissions have been granted.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser-based local storage is typically constrained to a 5MB threshold and is susceptible to accidental deletion when a user purges their browser cache. We should proactively investigate migrating to IndexedDB to accommodate larger datasets and enhance reliability.
- Vanilla JS Scalability: As the scope of the application broadens, persisting with a strictly framework-less architecture may inflate code complexity and technical debt. It will be crucial to establish and adhere to stringent state management and architectural design patterns to mitigate this risk.
- Mobile Compatibility: The native HTML5 drag-and-drop API often behaves erratically across diverse mobile platforms, which will likely necessitate the implementation of sophisticated polyfills or the development of extensive custom touch-event handling logic to guarantee a consistent experience.
