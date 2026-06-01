# Roadmap

## Vision & Goals
The fundamental goal of this project is to create a fast, simple, and strictly privacy-centric (local-first) web-based Kanban application. It is constructed natively using only vanilla HTML, CSS, and JavaScript. We intend to provide a seamless and highly responsive interface tailored for individual task management or small teams, fully eliminating the overhead of complex backend infrastructure. Continuous incremental value delivery is our guiding principle.

## Current Status
Currently, the software successfully provides the following foundational mechanics:
- Creation, modification, and deletion of board lists.
- Generation, editing, and removal of individual task cards.
- Intuitive drag-and-drop operations to seamlessly transition cards between lists.
- Robust data persistence relying entirely on the native browser `localStorage` engine.
- A fully responsive, horizontal-scrolling interface for varying screen sizes.

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
  - Task Checklists feature to track subtasks within a card.
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
- User value proposition: Empowers users to manually backup their active boards and easily migrate state between different browsers, safeguarding against accidental `localStorage` wipes.
- Technical approach (high-level): Implement logic to stringify the active `localStorage` payload into a `.json` format for direct download, and construct a file-reader input to parse incoming `.json` structures back into storage.
- Success criteria: A user must successfully download their full JSON state archive and flawlessly restore it within an incognito or clean session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Facilitates parallel tracking by allowing users to cleanly segregate distinct projects, departments, or life domains into independent boards.
- Technical approach (high-level): Architect a structural upgrade to the `localStorage` schema, migrating to an array-based board structure. Implement a global navigation component (e.g., sidebar or header dropdown) to toggle board contexts.
- Success criteria: Users can reliably instantiate, relabel, discard, and transition between discrete boards without cross-contamination of list or card data.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Grants the ability to assign definitive deadlines to specific tasks directly within the card interface for enhanced time management.
- Technical approach (high-level): Integrate a standard date-picker within the card editing modal, persisting the selection to the card's data schema. Apply conditional CSS rendering on the main board view to highlight approaching or lapsed deadlines.
- Success criteria: A user sets a target date on a card, observes the date badge on the board, and sees the color state transition appropriately based on temporal proximity.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks cross-platform continuity, allowing a single unified board view to persist seamlessly across mobile and desktop environments while retaining full offline capabilities.
- Technical approach (high-level): Integrate a lightweight BaaS layer (such as Firebase Firestore). Establish a synchronization worker that diffs local state against the cloud store when network connectivity is established, handling edge-case merge conflicts.
- Success criteria: Any mutation applied on device A automatically propagates to device B (authenticated with the same credentials) within seconds of network availability.
- Estimated effort: Large

### 5. Task Checklists
- User value proposition: Enables users to split complex or multi-step cards into smaller, actionable subtasks without cluttering the main board view with excessive lists.
- Technical approach (high-level): Modify the card object schema to support an array of subtask objects (containing text and boolean completion). Introduce a dedicated UI segment within the card modal for managing these subtasks dynamically.
- Success criteria: Users can append, remove, and toggle individual checklist items inside a card, observing a visible progress indicator updating in real-time.
- Estimated effort: Medium

## Dependencies & Risks
- **Storage Constraints**: The native browser `localStorage` engine inherently limits data to roughly 5MB. Power users hitting this cap, or users routinely clearing browser cache, risk data loss. Investigating an IndexedDB transition is a priority for sustainable growth.
- **Vanilla Architecture Scalability**: Foregoing modern component frameworks (like React or Vue) risks significant code spaghetti as the application surface area expands. Adopting a strict, modular state-management paradigm is imperative to prevent runaway technical debt.
- **Mobile Touch Friction**: The HTML5 native drag-and-drop specification is notoriously unreliable on capacitive touchscreens. We anticipate needing either an established polyfill or entirely bespoke touch-event routing to guarantee a fluid mobile experience.
