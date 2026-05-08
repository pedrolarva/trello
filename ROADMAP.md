# Roadmap

## Vision & Goals
The core vision of this project is to provide a highly performant, straightforward, and privacy-focused (local-first) web-based Kanban board. Built entirely with vanilla HTML, CSS, and JavaScript, it aims to offer an intuitive and responsive interface tailored for personal productivity and small-team task management without any backend complexity. Our main focus is continuous and incremental value delivery for users.

## Current Status
The project is stable and currently has the core functionalities fully implemented:
- Create, edit, and delete Kanban lists (boards).
- Create, edit, and delete individual task cards.
- Drag and Drop functionality to seamlessly move cards between lists.
- Reliable data persistence utilizing the browser's native `localStorage`.
- Fully responsive design featuring horizontal scrolling for mobile devices.

## Quarterly Roadmap

### Q1: User Experience (UX) and Stability
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
  - Implement dynamic board resizing to prevent unwanted layout overflow.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Introduce an archive feature to hide completed cards without deleting them.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.
  - Standardize error handling for invalid user inputs across forms.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
  - Add native checklist support inside individual task cards.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
  - Provide a quick-add card button at the top of each list.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.
  - Improve code modularity by splitting JavaScript utilities.

### Q3: Advanced Features and Customization
- High priority items (bugs, critical features)
  - [#10](https://github.com/pedrolarva/trello/issues/10) Support for multiple boards.
  - Implement full offline access using Service Workers.
- Medium priority items (enhancements, improvements)
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
  - Allow users to set custom background images for boards.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.
  - Enhance accessibility attributes (ARIA roles) for better screen reader support.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
  - Establish a unified activity log showing a history of changes.
- Medium priority items (enhancements, improvements)
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
  - Introduce a comprehensive notification system for due dates and sync events.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.
  - Add comprehensive keyboard shortcuts for navigating and editing tasks.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Enables users to safely back up their boards and migrate data between browsers manually, preventing data loss.
- Technical approach (high-level): Implement logic to serialize the existing `localStorage` data into a `.json` file for download, and a file parser to restore `localStorage` from uploaded files.
- Success criteria: Users can reliably download a JSON file containing all their boards and successfully restore it in a completely fresh session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Helps in organizing different projects or life areas into completely separate boards.
- Technical approach (high-level): Update the data structure in `localStorage` to support an array of boards, each containing its own lists and cards. Create a sidebar menu or dropdown to switch between boards.
- Success criteria: The user can create, rename, delete, and switch between different boards without data mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Allows users to track task deadlines directly on the card.
- Technical approach (high-level): Add a date input field in the card edit modal. Save the date in the card object. Update the card interface to display the date and change color if the deadline is approaching or overdue.
- Success criteria: The user can set a date, view it on the card, and easily identify overdue tasks via visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Enables using the same board across different devices (mobile and PC) in real-time while maintaining offline functionality.
- Technical approach (high-level): Utilize a BaaS (Backend as a Service) like Firebase Firestore. Sync local data with the cloud when an internet connection is available, using conflict resolution strategies.
- Success criteria: Data is automatically and correctly synced between two different devices logged into the same account.
- Estimated effort: Large

### 5. Offline Access via Service Workers
- User value proposition: Users can load, view, and interact with their boards even when temporarily disconnected from the internet.
- Technical approach (high-level): Implement a basic Service Worker that caches static assets (HTML, CSS, JS) and serves them reliably during offline sessions.
- Success criteria: The application loads successfully and displays the previously cached boards when the browser has no network connection.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage typically has a strict 5MB size limit and can be inadvertently wiped when users clear browser data. We must consider migrating to IndexedDB to overcome these restrictions.
- Vanilla JS Scalability: As the application grows, relying purely on vanilla JavaScript without frameworks might increase technical debt and code complexity. Establishing clear architectural patterns is essential to manage state effectively.
- Mobile Compatibility: Utilizing native HTML5 Drag and Drop can result in inconsistent behavior across mobile devices, which may necessitate polyfills or extensive custom touch event handlers.
- Service Worker Complexity: Implementing offline support introduces challenges around caching and cache invalidation, which might lead to users seeing stale application versions if not managed properly.
