# Roadmap

## Vision & Goals
The goal of this project is to provide a simple, fast, privacy-focused (local-first), and accessible web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. It aims to offer an intuitive and responsive interface for personal or small-team task management without the need for complex setups or backends. Focus is on incremental value delivery and ensuring a highly inclusive user experience for all individuals, including keyboard-only users.

## Current Status
The project currently has core functionalities implemented:
- Create, edit, and delete lists (boards).
- Create, edit, and delete cards.
- Drag and Drop functionality to move cards between lists.
- Data persistence using the browser's `localStorage`.
- Responsive design with horizontal scrolling.

## Quarterly Roadmap

### Q1: User Experience (UX), Stability, and Accessibility
- High priority items (bugs, critical features)
  - [#1](https://github.com/pedrolarva/trello/issues/1) Bug fixes for Drag and Drop on mobile devices (touch events).
  - [#2](https://github.com/pedrolarva/trello/issues/2) Add confirmation dialogs before deleting lists or cards.
  - Keyboard Navigation & Accessibility: Ensure all interactive elements are fully usable without a mouse.
- Medium priority items (enhancements, improvements)
  - [#3](https://github.com/pedrolarva/trello/issues/3) Colored labels/tags for cards.
  - [#4](https://github.com/pedrolarva/trello/issues/4) Automatic sorting of cards within a list.
  - Assigning Members to Cards: Allow users to create and assign pseudo-members to tasks.
- Low priority items (technical debt, optimizations)
  - [#5](https://github.com/pedrolarva/trello/issues/5) CSS refactoring for better use of variables and maintainability.

### Q2: Data Management and Productivity
- High priority items (bugs, critical features)
  - [#6](https://github.com/pedrolarva/trello/issues/6) Export/Import data (JSON) functionality for backups.
- Medium priority items (enhancements, improvements)
  - [#7](https://github.com/pedrolarva/trello/issues/7) Due dates on cards with visual alerts for overdue tasks.
  - [#8](https://github.com/pedrolarva/trello/issues/8) Search and filter cards by text or label.
  - Task Dependencies: Ability to block a card until another is completed.
- Low priority items (technical debt, optimizations)
  - [#9](https://github.com/pedrolarva/trello/issues/9) DOM manipulation optimization for better performance on large boards.

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
- User value proposition: Allows users to back up their boards and transfer data between browsers or devices manually, ensuring they don't lose information if `localStorage` is cleared.
- Technical approach: Create functions to serialize the current `localStorage` state into a `.json` file for download. Create a file input to read a `.json` file and update `localStorage`.
- Success criteria: The user can download the complete data as a JSON file and successfully restore it in a clean session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Helps in organizing different projects or life areas into completely separate boards.
- Technical approach: Update the data structure in `localStorage` to support an array of boards, each containing its own lists and cards. Create a sidebar menu or dropdown to switch between boards.
- Success criteria: The user can create, rename, delete, and switch between different boards without data mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Allows users to track task deadlines directly on the card.
- Technical approach: Add a date input field in the card edit modal. Save the date in the card object. Update the card interface to display the date and change color if the deadline is approaching or overdue.
- Success criteria: The user can set a date, view it on the card, and easily identify overdue tasks via visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Enables using the same board across different devices (mobile and PC) in real-time while maintaining offline functionality.
- Technical approach: Utilize a BaaS (Backend as a Service) like Firebase Firestore. Sync local data with the cloud when an internet connection is available, using conflict resolution strategies.
- Success criteria: Data is automatically and correctly synced between two different devices logged into the same account.
- Estimated effort: Large

### 5. Assigning Members to Cards
- User value proposition: Allows teams to clarify who is responsible for specific tasks by assigning pseudo-members to cards.
- Technical approach: Define a list of available members. Add UI in the card modal to select assignees and store them in the card's state. Render member initials on the card interface.
- Success criteria: Users can successfully add, remove, and view assigned members on cards.
- Estimated effort: Medium

### 6. Keyboard Navigation & Accessibility
- User value proposition: Ensures all users, regardless of ability, can fully interact with the Kanban board using standard keyboard controls.
- Technical approach: Add proper `tabindex` and ARIA labels. Implement keyboard event listeners for moving cards and lists using arrow keys.
- Success criteria: The entire board can be navigated and modified using only a keyboard without breaking the visual flow.
- Estimated effort: Large

### 7. Task Dependencies
- User value proposition: Helps users sequence their work by preventing a task from being moved or marked complete until its dependent tasks are finished.
- Technical approach: Store a list of blocking card IDs within a card's state. Prevent drag/drop or status changes via UI logic if blockers exist and are incomplete.
- Success criteria: Users receive a clear visual warning when attempting to complete a blocked task, and the action is prevented.
- Estimated effort: Medium

## Dependencies & Risks
- Security & XSS Vulnerabilities: Because the project relies on vanilla DOM manipulation, any usage of `innerHTML` for dynamic content poses a significant Cross-Site Scripting (XSS) risk. All dynamic user data must be sanitized before rendering.
- LocalStorage Limitations: Browser local storage has a size limit (typically 5MB) and can be accidentally wiped by the user when clearing browser data. We may need to investigate IndexedDB for larger limits.
- Vanilla JS Scalability: Maintaining the project without frameworks might make the code complex and harder to maintain as the application grows (technical debt). A clear architecture pattern will be required to manage state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop features can be inconsistent on mobile devices, potentially requiring polyfills or significant custom touch event handling.
