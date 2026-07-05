# Roadmap

## Vision & Goals
The primary objective of this project is to develop a lightweight, exceptionally fast, and privacy-centric (local-first) web-based Kanban application using strictly vanilla HTML, CSS, and JavaScript. Our goal is to provide a highly intuitive, frictionless, and responsive user experience for personal productivity and small-scale task management, deliberately avoiding complex backend requirements or intricate onboarding. We remain strictly focused on incremental value delivery to our users.

## Current Status
Currently, the application successfully implements all foundational Kanban mechanics:
- Seamless creation, modification, and deletion of project lists (boards).
- Robust creation, editing, and deletion of individual task cards.
- Native HTML5 Drag and Drop capabilities allowing fluid movement of cards across different lists.
- Reliable, offline-first data persistence relying entirely on the browser's `localStorage` API.
- Fully responsive layout ensuring usability across different screen sizes via horizontal scrolling.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Implement touch-friendly Drag and Drop polyfills for robust mobile device support.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Integrate safety confirmation dialogs prior to any destructive actions (deleting lists or cards).
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Introduce colored label tags for visual card categorization.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Support automated, rule-based sorting of cards within individual lists.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Comprehensive CSS refactoring to implement unified design tokens and CSS variables for enhanced maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Robust Export/Import (JSON) capabilities allowing users to manually backup their local state.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Implement due dates on cards accompanied by clear visual warnings for approaching or overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop global search and filtering mechanisms by keyword or assigned label.
  - [#17](https://github.com/pedrolarva/trello/issues/17) Add subtasks checklist support within individual task cards.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Strategically optimize DOM manipulation routines to ensure 60fps rendering even on massively populated boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Architect support for managing multiple, entirely independent boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Introduce deep theme customization, prioritizing a native Dark Mode and user-selectable color palettes.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Parse and render rich Markdown formatting within card description fields.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Implement smooth CSS transitions and layout animations when mutating the board state.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Offer optional Cloud Sync capabilities via lightweight BaaS integrations (e.g., Firebase, Supabase) for cross-device continuity.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Introduce a straightforward activity audit log to track recent user actions and board modifications.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Lay the groundwork for comprehensive internationalization (i18n) to support localization across multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to manually safeguard their board configurations and transfer state seamlessly between browsers, acting as a crucial failsafe against accidental `localStorage` clearing.
- Technical approach (high-level): Develop robust serialization routines to convert `localStorage` state into a downloadable JSON artifact, alongside a file input parser to reliably hydrate state from a selected file.
- Success criteria: Users can reliably export their total workspace state into a `.json` file and successfully import it into a pristine session without data loss.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Provides critical organizational boundaries, allowing users to cleanly segregate distinct projects or life domains into their own isolated contexts.
- Technical approach (high-level): Refactor the core `localStorage` schema to maintain a top-level array of discrete board objects. Implement a global navigation interface (e.g., sidebar or dropdown) facilitating context switching.
- Success criteria: Users can effortlessly spawn, rename, remove, and switch between an arbitrary number of boards, strictly avoiding any cross-contamination of list or card data.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Grants users precise control over task scheduling and deadlines directly embedded within the card interface.
- Technical approach (high-level): Augment the card creation modal with native date-picker inputs. Persist deadline timestamps within the internal card schema, and implement conditional rendering logic to prominently flag impending or missed deadlines.
- Success criteria: Users can explicitly define target dates, view them instantly on the board, and reliably notice overdue items via prominent visual styling.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks seamless multi-device continuity, allowing real-time workspace collaboration while gracefully retaining the application's core offline-first resilience.
- Technical approach (high-level): Integrate a minimal Backend-as-a-Service (BaaS) provider. Implement background sync workers to reconcile local mutations with the remote datastore, handling potential race conditions via robust conflict resolution.
- Success criteria: Modifications are automatically and reliably propagated between distinct devices authenticated to the same user session without manual intervention.
- Estimated effort: Large

### 5. Subtasks Checklist ([#17](https://github.com/pedrolarva/trello/issues/17))
- User value proposition: Enables users to break down complex cards into smaller, actionable steps without cluttering the main board view.
- Technical approach (high-level): Update the card schema to include an array of subtask objects (id, title, completion status). Enhance the card modal to render interactive checklist items and a progress bar.
- Success criteria: Users can create, toggle, and delete individual subtasks inside a card, and see overall completion progress at a glance.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Constraints: Browser storage APIs inherently impose strict quotas (frequently ~5MB) and remain highly susceptible to accidental user data clearing. Transitioning to IndexedDB may be required to sustainably handle larger datasets.
- Vanilla JS Maintainability: Eschewing established frontend frameworks increases the risk of spaghetti code as the application's complexity scales. Adhering to strict architectural patterns and separation of concerns is strictly mandated to control technical debt.
- Mobile Compatibility Quirks: The native HTML5 Drag and Drop API exhibits notoriously inconsistent behavior on touch interfaces. This dependency risks necessitating heavy polyfills or writing highly custom touch-event handlers to ensure a functional mobile experience.
