# Roadmap

## Vision & Goals
The overarching goal of this project is to provide a highly performant, remarkably simple, and strictly privacy-focused (local-first) web-based Kanban board. Built entirely with vanilla HTML, CSS, and JavaScript, it guarantees zero external dependencies for its core functionality. It aims to offer an intuitive, visually pleasing, and highly responsive interface for personal or small-team task management without the overhead of complex setups, user accounts, or heavy backends. Our development philosophy centers heavily on incremental value delivery, ensuring each release brings tangible, usable improvements to the end user.

## Current Status
The project has established a solid foundation with core functionalities fully implemented and stable:
- Create, edit, and seamlessly delete lists (boards) to manage workflows.
- Create, edit, and delete individual cards with detailed descriptions.
- Robust Drag and Drop functionality to easily move cards between lists.
- Reliable data persistence utilizing the browser's native `localStorage` API.
- A fully responsive design pattern ensuring usability across devices, featuring smooth horizontal scrolling for extended boards.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
  - Implement robust error handling for localStorage quota limits.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Improve keyboard accessibility for board navigation.
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
  - Centralize state management logic.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
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
- User value proposition: Allows users to securely back up their critical boards and effortlessly transfer data between different browsers or devices manually, ensuring they don't lose vital information if `localStorage` is inadvertently cleared.
- Technical approach (high-level): Create dedicated utility functions to serialize the current `localStorage` state into a structured `.json` file for secure download. Develop a robust file input parser to read a valid `.json` file and safely overwrite or merge with the current `localStorage` state.
- Success criteria: The user can reliably download the complete application data as a JSON file and successfully restore it in a completely clean browser session without data corruption.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Significantly helps in organizing disparate projects, work scopes, or personal life areas into completely isolated and focused boards.
- Technical approach (high-level): Architect a structural update to the data payload in `localStorage` to support an array of board objects, each uniquely containing its own lists and cards. Implement a responsive sidebar menu or top-level dropdown to seamlessly switch contexts between boards.
- Success criteria: The user can intuitively create, rename, delete, and instantly switch between different boards without any risk of data mixing or state leakage.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Provides a critical temporal dimension, allowing users to track task deadlines directly on the card interface to improve personal productivity.
- Technical approach (high-level): Integrate a robust date input field within the card edit modal interface. Persist the selected date string within the card's internal object model. Augment the card rendering logic to display the date and dynamically apply warning colors if the deadline is imminently approaching or past due.
- Success criteria: The user can effortlessly set a precise date, view it clearly on the card face, and immediately identify overdue tasks via unmistakable visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Enables seamless continuity by allowing usage of the same board across different devices (mobile and PC) in near real-time, while strictly maintaining the core offline-first functionality.
- Technical approach (high-level): Strategically integrate a BaaS (Backend as a Service) provider like Firebase Firestore. Develop a synchronization engine that mirrors local state with the cloud whenever an active internet connection is detected, implementing robust conflict resolution strategies for offline edits.
- Success criteria: Application data is automatically, invisibly, and correctly synced between two different devices logged into the same account without requiring manual intervention.
- Estimated effort: Large

### 5. Theme Customization (Dark Mode)
- User value proposition: Improves visual comfort in low-light environments and allows users to personalize the application's aesthetic to their preference.
- Technical approach (high-level): Implement CSS custom properties (variables) for all color values. Create a toggle control in the UI that applies a specific class to the document body, overriding the default variables with a dark color palette. Persist the user's preference in `localStorage`.
- Success criteria: The user can toggle between light and dark modes, the UI updates instantly, and the preference is remembered across sessions.
- Estimated effort: Small

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage has a strict size limit (typically around 5MB) and can be easily and accidentally wiped by the user when clearing browser data or cache. We may eventually need to investigate IndexedDB for significantly larger storage limits and better persistence guarantees.
- Vanilla JS Scalability: Maintaining the project's logic without modern frameworks might make the codebase increasingly complex and harder to maintain as the application's feature set grows (accumulating technical debt). A clear, strictly adhered-to architecture pattern will be required to manage complex state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop features are notoriously inconsistent on mobile browsers, potentially requiring complex polyfills or significant custom touch event handling to ensure a smooth user experience.
