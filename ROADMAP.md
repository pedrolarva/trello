# Roadmap

## Vision & Goals
The primary vision of this project is to provide a simple, fast, and privacy-focused (local-first) web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. Our goal is to offer an intuitive and responsive interface for personal or small-team task management without complex setups or backends, focusing heavily on practical, incremental value delivery.

## Current Status
The project is functional and currently has the following core features implemented:
- Create, edit, and delete lists (boards).
- Create, edit, and delete individual cards.
- Drag and drop functionality to seamlessly move cards between lists.
- Reliable data persistence using the browser's native `localStorage`.
- A responsive user interface featuring horizontal scrolling.

## Quarterly Roadmap

This section organizes our planned improvements by quarters (Q1, Q2, Q3, Q4) to ensure steady, incremental value delivery.

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Resolve drag and drop bugs on mobile touch devices.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Introduce confirmation dialogs before deleting lists or cards.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Implement colored labels and tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Add automatic sorting of cards within a list.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Refactor CSS to better utilize variables and improve maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Build export/import data (JSON) functionality for manual backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Implement due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Develop search and filtering of cards by text or label.
  - Card and List Archiving: Hide completed items from the main board without deleting them.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize DOM manipulation to enhance performance on large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Introduce support for managing multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Add theme customization options, including Dark Mode.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Support Markdown rendering in card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Implement smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Integrate optional Cloud Sync using Firebase or Supabase for multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Add a simple activity log or history view.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Implement internationalization (i18n) to support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Enables users to back up their boards and transfer data manually between browsers or devices, preventing data loss if `localStorage` is cleared.
- Technical approach (high-level): Develop functions to serialize the current `localStorage` state into a downloadable `.json` file, and create a file input mechanism to read a `.json` file to restore `localStorage`.
- Success criteria: Users can successfully download all board data as a JSON file and restore it seamlessly in a clean session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Assists users in organizing distinct projects or different life areas into completely separate, uncluttered boards.
- Technical approach (high-level): Refactor the `localStorage` data structure to support an array of boards, where each contains its own lists and cards. Implement a sidebar menu or dropdown UI to facilitate switching between boards.
- Success criteria: Users can create, rename, delete, and freely switch between multiple boards without any data overlapping.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Empowers users to keep track of task deadlines directly on individual cards.
- Technical approach (high-level): Incorporate a date input field within the card edit modal, store the selected date in the card object, and update the rendering logic to display the date and apply color changes when deadlines are nearing or overdue.
- Success criteria: Users can define a date, view it prominently on the card, and quickly identify overdue tasks through clear visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Allows users to synchronize and access the same board across multiple devices (mobile and PC) in real-time, while preserving offline functionality.
- Technical approach (high-level): Leverage a Backend as a Service (BaaS) such as Firebase Firestore to sync local data with the cloud whenever an internet connection is active, implementing robust conflict resolution strategies.
- Success criteria: Data automatically and accurately synchronizes between two distinct devices authenticated to the same user account.
- Estimated effort: Large

### 5. Card and List Archiving
- User value proposition: Gives users the ability to hide completed or outdated cards and lists without permanent deletion, keeping the primary board view clean and organized.
- Technical approach (high-level): Introduce an `archived` boolean property to both list and card data models. Adjust the main rendering logic to filter out archived items, and build a dedicated 'Archive' view to browse, restore, or permanently delete them.
- Success criteria: Users can archive a list or card to remove it from the main view, and successfully restore it later from the separate archive interface.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Native browser local storage typically enforces a 5MB size limit and can be inadvertently wiped when users clear browser data. Investigating IndexedDB for larger storage capacities may be necessary.
- Vanilla JS Scalability: Building without frontend frameworks could result in complex, hard-to-maintain code as the application scales (technical debt). Establishing a clear architectural pattern will be crucial for effective state management.
- Mobile Compatibility: Utilizing native HTML5 Drag and Drop can yield inconsistent behavior on mobile platforms, which may necessitate polyfills or extensive custom touch event handling.
