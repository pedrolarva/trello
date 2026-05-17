# Roadmap

## Vision & Goals
Our primary vision is to deliver an exceptionally fast, simple, and strictly privacy-focused local-first web Kanban board. Built seamlessly with vanilla HTML, CSS, and JavaScript, the application strives to provide a highly intuitive, responsive, and robust interface tailored for individual productivity and small-team collaboration without relying on complex backend infrastructures. We remain firmly committed to incremental value delivery.

## Current Status
The application is actively maintained and currently supports these fully functional core capabilities:
- Seamless creation, editing, and deletion of boards (lists).
- Full lifecycle management for individual cards.
- Intuitive drag-and-drop operations for rearranging and moving cards across lists.
- Reliable client-side data persistence leveraging `localStorage`.
- A fully responsive layout supporting horizontal scrolling for extensive workflows.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Add inline editing for list titles.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
  - Add card archiving capabilities.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Introduce customizable board backgrounds.
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
- User value proposition: Empowers users to create secure local backups and confidently migrate their boards across different browsers or hardware, mitigating the risk of data loss from cleared `localStorage`.
- Technical approach (high-level): Implement specialized serialization functions to parse `localStorage` content into structured `.json` payloads for download, alongside file upload handlers to safely parse and inject restored states.
- Success criteria: Users can reliably export their entire workspace as a valid JSON file and flawlessly import it into a fresh browser environment without errors.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Provides robust organizational scaffolding for managing distinct, unconnected projects and workflows within entirely separate board spaces.
- Technical approach (high-level): Architect a structural upgrade to the local data schema, wrapping existing lists and cards within a higher-level array of discrete board objects. Develop an accessible sidebar or navigation header for switching contexts.
- Success criteria: Users can intuitively generate, modify, delete, and rapidly switch between disparate boards while ensuring zero data bleed between them.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Equips users with the necessary tools to establish precise deadlines and monitor time-sensitive tasks directly from the board view.
- Technical approach (high-level): Extend the card data model and edit modal to accommodate standard date inputs. Implement dynamic rendering logic to assign urgent visual indicators when a deadline is imminent or passed.
- Success criteria: Users can seamlessly assign dates, instantly view them on card faces, and correctly interpret automated visual alerts for impending or missed deadlines.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Facilitates continuous workflow continuity by enabling real-time, multi-device synchronization while preserving core offline capabilities.
- Technical approach (high-level): Integrate a robust Backend-as-a-Service provider, such as Firebase Firestore, orchestrating bidirectional sync operations that gracefully handle intermittent connectivity and resolve local/remote state conflicts.
- Success criteria: Accurate, real-time reflection of board changes across at least two active sessions on distinct devices associated with the same user profile.
- Estimated effort: Large

## Dependencies & Risks
- LocalStorage Limitations: Browser `localStorage` strict size constraints (frequently capped at 5MB) and the susceptibility to accidental user deletion necessitate proactive research into transitioning toward more durable IndexedDB implementations.
- Vanilla JS Scalability: As feature complexity increases, the absence of a structured frontend framework introduces substantial risk of bloated, unmaintainable logic. Strict adherence to a documented, modular state management architecture is mandatory to mitigate this technical debt.
- Mobile Compatibility: Inherent cross-device discrepancies in native HTML5 Drag and Drop events pose critical usability threats on touch devices. We must rigorously test and potentially deploy advanced polyfills or custom touch-event controllers to guarantee parity.
