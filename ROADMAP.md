# Roadmap

## Vision & Goals
The primary goal of this project is to deliver a highly responsive, lightweight, and privacy-centric (local-first) web-based Kanban board. It is built entirely with vanilla HTML, CSS, and JavaScript, eschewing complex build steps or heavy frontend frameworks. It aims to offer an intuitive and responsive interface for personal or small-team task management without the need for complex setups, databases, or cloud backends. The core focus is on incremental value delivery, ensuring each release brings tangible improvements to the user experience while maintaining code simplicity.

## Current Status
The project currently has core functionalities implemented and is highly functional for basic use:
- Create, edit, and delete lists (boards) with ease.
- Create, edit, and delete task cards within lists.
- Drag and Drop functionality to move cards fluidly between lists.
- Data persistence using the browser's `localStorage` ensuring no data loss on refresh.
- Responsive design with horizontal scrolling to accommodate numerous lists.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Implement bug fixes for Drag and Drop on mobile devices to ensure reliable touch event handling.
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add safety confirmation dialogs before deleting lists or cards to prevent accidental data loss.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Introduce colored labels and tags for cards to improve visual organization.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Enable automatic sorting of cards within a list based on user-defined criteria.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) Perform CSS refactoring for better use of variables, significantly improving maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Develop Export/Import data (JSON) functionality to allow users to create manual backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Implement due dates on cards featuring visual alerts and color shifts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Build robust search and filter capabilities to find cards by text, label, or date.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) Optimize DOM manipulation routines for noticeably better performance on extremely large boards.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Architect support for multiple distinct boards to separate projects or workflows entirely.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Introduce deep theme customization, including a dedicated Dark Mode and various color themes.
  - [#12](https://github.com/pedrolarva/trello/issues/12) Integrate markdown rendering support within card descriptions for rich text formatting.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Implement smoother, hardware-accelerated animations when adding, removing, or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Build optional Cloud Sync integration using services like Firebase or Supabase to allow seamless multi-device usage.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Add a simple activity log and history tracker to review past actions and board changes.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Prepare internationalization (i18n) infrastructure to easily support multiple languages globally.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Empowers users to fully back up their boards and transfer data securely between browsers or devices manually, ensuring they never lose information even if `localStorage` is completely cleared.
- Technical approach (high-level): Create utility functions to serialize the entire current `localStorage` state into a downloadable `.json` file. Develop a dedicated file input UI to read an uploaded `.json` file, parse it safely, and overwrite `localStorage`.
- Success criteria: The user can reliably download the complete application data as a JSON file and successfully restore it in a completely clean browser session without errors.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Provides immense organizational value by helping users segregate different large projects or entirely separate life areas into completely isolated boards.
- Technical approach (high-level): Substantially update the core data structure in `localStorage` to support a top-level array of board objects, each containing its own arrays of lists and cards. Create a persistent sidebar menu or dropdown navigation to swiftly switch active boards.
- Success criteria: The user can fluidly create, rename, delete, and switch between multiple different boards without any data leaking or mixing between them.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Crucial for productivity, it allows users to rigidly track task deadlines directly on the face of the card without opening it.
- Technical approach (high-level): Add a native HTML5 date input field in the main card edit modal. Save the selected date timestamp within the card object. Update the primary card rendering interface to prominently display the formatted date and shift the background color to red if the deadline is approaching or already overdue.
- Success criteria: The user can effortlessly set a valid date, view it clearly on the minimized card, and instantly identify overdue tasks via obvious visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Unlocks true mobility by enabling users to interact with the exact same board across different devices (e.g., mobile and PC) in real-time while strictly maintaining the core offline-first functionality.
- Technical approach (high-level): Utilize a proven BaaS (Backend as a Service) platform like Firebase Firestore or Supabase. Transparently sync local data with the remote cloud database only when an internet connection is actively available, utilizing sophisticated conflict resolution strategies to merge changes.
- Success criteria: Application data is automatically, invisibly, and correctly synced between two physically different devices logged into the same synchronized account.
- Estimated effort: Large

## Dependencies & Risks
- LocalStorage Limitations: The browser's native localStorage is typically capped at around 5MB and can be accidentally wiped by the user when clearing browser data or running cleanup tools. As the user accumulates boards and cards, this limit may become a bottleneck. We may need to investigate IndexedDB or File API integration for larger, more robust storage limits in the future.
- Vanilla JS Scalability: As we add features like due dates, colored labels, and potential cloud sync, managing the DOM and state purely in vanilla JavaScript without a framework like React or Vue will become increasingly complex. A strict, clear architecture pattern and modularization strategy will be required to manage state effectively and prevent technical debt from spiraling.
- Mobile Compatibility & Touch Events: Native HTML5 Drag and Drop features are often notoriously inconsistent or non-functional on mobile touch devices. This may require integrating third-party polyfills or investing significant effort into custom touch event handling (touchstart, touchmove, touchend) to ensure parity between desktop and mobile experiences.
