# Roadmap

## Vision & Goals
The primary goal of this project is to provide a fast, simple, and privacy-first (local-first) web-based Kanban board built solely with vanilla HTML, CSS, and JavaScript. We aim to deliver an intuitive and highly responsive interface for personal and small-team task management without requiring any complex setups, databases, or backends. Our focus remains strictly on delivering incremental value to users.

## Current Status
The project currently has stable core functionalities implemented:
- Create, modify, and delete lists (boards).
- Create, modify, and delete individual cards.
- Seamless Drag and Drop functionality for moving cards across lists.
- Reliable data persistence utilizing the browser's native `localStorage`.
- Fully responsive web design with optimized horizontal scrolling.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Custom board background colors and images.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
  - Add checklists to individual cards.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Assign members/initials to cards.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
  - Webhooks for external integrations.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Enables users to safely back up their boards and transfer data manually between browsers or devices, ensuring zero data loss if `localStorage` is cleared.
- Technical approach (high-level): Implement serialization functions to export the current `localStorage` state into a downloadable `.json` file, and a file input mechanism to parse a `.json` file and restore `localStorage`.
- Success criteria: Users can reliably download their complete board data as a JSON file and successfully restore it in a completely clean browser session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Provides the ability to organize disparate projects or life areas into entirely isolated boards.
- Technical approach (high-level): Migrate the `localStorage` data structure to support an array of boards, where each board contains its own lists and cards. Introduce a UI sidebar or dropdown to facilitate switching between boards.
- Success criteria: Users can create, rename, delete, and seamlessly switch between different boards without any data overlap.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Allows users to set and track task deadlines directly on their cards for better time management.
- Technical approach (high-level): Incorporate a date input field within the card edit modal, store the date within the card object, and update the UI to visually flag cards when deadlines are approaching or overdue.
- Success criteria: Users can assign a date, view it on the card face, and quickly spot overdue tasks through distinct visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Empowers users to access and modify the same board across multiple devices in real-time, while still retaining full offline functionality.
- Technical approach (high-level): Integrate a Backend as a Service (BaaS) provider like Firebase Firestore to synchronize local data with the cloud whenever network connectivity is active, utilizing robust conflict resolution strategies.
- Success criteria: Data synchronizes automatically and accurately across two independent devices logged into the identical account.
- Estimated effort: Large

### 5. Custom Board Backgrounds
- User value proposition: Lets users personalize their workspace with custom colors or images to improve visual organization.
- Technical approach (high-level): Add a background property to the board state in `localStorage` and a UI picker to select colors or upload base64 images.
- Success criteria: Users can set a custom background per board and it persists across reloads.
- Estimated effort: Medium

### 6. Card Checklists
- User value proposition: Allows users to break down larger tasks into actionable sub-tasks directly within a single card.
- Technical approach (high-level): Add an array of checklist item objects to the card data model and build a UI in the modal to add, toggle, and delete items.
- Success criteria: Users can manage and check off multiple sub-tasks on a card, with progress saved to local storage.
- Estimated effort: Medium

## Dependencies & Risks
- **LocalStorage Limitations**: Browsers generally restrict local storage to about 5MB, which can be exceeded easily if users store large base64 background images. We might need to migrate to IndexedDB to accommodate larger data limits.
- **Vanilla JS Scalability**: Developing the application without modern frameworks can lead to complex and hard-to-maintain code as features expand (increased technical debt). Establishing a clear architectural pattern is imperative for effective state management.
- **Mobile Compatibility**: The native HTML5 Drag and Drop API behaves inconsistently on mobile platforms, meaning we may need to integrate polyfills or write substantial custom logic for robust touch event handling.
