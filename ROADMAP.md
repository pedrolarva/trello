# Roadmap

## Vision & Goals
The primary vision of this project is to provide a simple, lightning-fast, and deeply privacy-focused local-first Kanban board, built entirely with modern vanilla HTML, CSS, and JavaScript. We aim to offer a frictionless, intuitive interface tailored for personal task tracking and small-team collaboration without any heavy backends. Our key focus remains on steady, incremental value delivery to our users.

## Current Status
Currently, the application features several core capabilities:
- Create, modify, and safely delete organizational lists (boards).
- Add, edit, and safely remove individual task cards.
- Seamless Drag and Drop operations for moving cards between different lists.
- Reliable offline data persistence via native browser `localStorage`.
- A fully responsive layout supporting horizontal scroll on smaller screens.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Resolve touch event bugs impacting Drag and Drop on mobile devices.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Implement safety confirmation dialogs prior to list or card deletion.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Introduce colored visual labels and tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Enable automated sorting capabilities for cards within lists.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Refactor CSS architecture to utilize CSS variables for greater maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Introduce JSON Export/Import features for robust local backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Add due dates to cards alongside clear visual cues for impending deadlines.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Build robust text and label-based search and filter functionality.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize DOM manipulation routines to ensure smooth performance on heavily populated boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Introduce full support for managing multiple distinct boards.
- Medium priority items (enhancements, improvements)
  - Keyboard Navigation and Shortcuts
  - [#11](https://github.com/pedrolarva/trello/issues/11) Provide comprehensive theme customization, including Dark Mode.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Integrate Markdown rendering for rich card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Implement smooth, non-blocking animations for adding or moving UI elements.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Offer optional Cloud Sync capabilities (via Firebase/Supabase) to support multi-device workflows.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Introduce a straightforward activity log and board history timeline.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Establish an i18n architecture to pave the way for multiple language support.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to manually back up their entire board state or migrate between devices, mitigating the risk of accidental `localStorage` deletion.
- Technical approach (high-level): Implement serialization logic to download the active `localStorage` state as a JSON file, paired with a file reader utility to restore state from uploaded JSON.
- Success criteria: Users can reliably export all board data to a local `.json` file and successfully restore it into a blank session without data corruption.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Dramatically improves organization by allowing users to compartmentalize disparate projects and life areas into independent boards.
- Technical approach (high-level): Refactor the base `localStorage` schema to accommodate an array of board objects. Build an intuitive sidebar or dropdown UI to facilitate board switching.
- Success criteria: Users must be able to create, rename, safely delete, and rapidly switch between boards while maintaining complete data isolation.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Enhances task tracking by providing immediate visibility into impending deadlines directly on the board view.
- Technical approach (high-level): Extend the card edit modal with a date picker, store the selected timestamp in the card's data object, and implement conditional rendering logic to highlight overdue or impending items.
- Success criteria: Users can assign a due date to any card, view it at a glance, and rely on color-coded alerts to identify critical deadlines.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Delivers real-time, multi-device continuity while carefully preserving the app's fundamental offline-first capabilities.
- Technical approach (high-level): Integrate a BaaS solution like Firebase Firestore to intelligently synchronize local state with remote storage when network connectivity is detected, relying on robust conflict resolution.
- Success criteria: Data modifications automatically and consistently propagate across multiple authenticated devices with minimal latency.
- Estimated effort: Large

### 5. Keyboard Navigation and Shortcuts
- User value proposition: Significantly boosts user efficiency by enabling power users to rapidly navigate and manipulate the board without relying on a mouse.
- Technical approach (high-level): Bind global and focused event listeners to keydown events to intercept and route standard keyboard shortcuts to core application actions.
- Success criteria: All primary workflows, including creating lists, adding cards, and moving items, can be seamlessly executed using only keyboard input.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Native browser storage is constrained by a strict quota (usually 5MB) and is vulnerable to accidental data clearing by the user. A future migration to IndexedDB may be necessary for power users.
- Vanilla JS Scalability: Opting out of modern UI frameworks risks an accumulation of technical debt and complex DOM manipulation code over time. Maintaining a highly disciplined, modular architectural pattern is critical.
- Mobile Compatibility: Relying on native HTML5 Drag and Drop APIs poses significant cross-browser consistency challenges on touch-based mobile devices, likely requiring custom touch event handling or external polyfills.
