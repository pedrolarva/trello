# Roadmap

## Vision & Goals
The goal of this project is to provide a simple, fast, and privacy-focused (local-first) web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. It aims to offer an intuitive and responsive interface for personal or small-team task management without the need for complex setups or backends. Focus is on incremental value delivery.

## Current Status
The project currently has core functionalities implemented:
- Create, edit, and delete lists (boards).
- Create, edit, and delete cards.
- Drag and Drop functionality to move cards between lists.
- Data persistence using the browser's `localStorage`.
- Responsive design with horizontal scrolling.

## Quarterly Roadmap

### Q1
- **High priority items (bugs, critical features)**
  - Bug fixes for Drag and Drop on mobile devices (touch events) [#27](https://github.com/pedrolarva/trello/issues/27)
  - Add confirmation dialogs before deleting lists or cards [#28](https://github.com/pedrolarva/trello/issues/28)
- **Medium priority items (enhancements, improvements)**
  - Colored labels/tags for cards [#29](https://github.com/pedrolarva/trello/issues/29)
  - Automatic sorting of cards within a list [#30](https://github.com/pedrolarva/trello/issues/30)
- **Low priority items (technical debt, optimizations)**
  - CSS refactoring for better use of variables and maintainability [#31](https://github.com/pedrolarva/trello/issues/31)

### Q2
- **High priority items (bugs, critical features)**
  - Export/Import data (JSON) functionality for backups [#32](https://github.com/pedrolarva/trello/issues/32)
- **Medium priority items (enhancements, improvements)**
  - Due dates on cards with visual alerts for overdue tasks [#33](https://github.com/pedrolarva/trello/issues/33)
  - Search and filter cards by text or label [#34](https://github.com/pedrolarva/trello/issues/34)
- **Low priority items (technical debt, optimizations)**
  - DOM manipulation optimization for better performance on large boards [#35](https://github.com/pedrolarva/trello/issues/35)

### Q3
- **High priority items (bugs, critical features)**
  - Support for multiple boards [#36](https://github.com/pedrolarva/trello/issues/36)
- **Medium priority items (enhancements, improvements)**
  - Theme customization (Dark Mode and color themes) [#37](https://github.com/pedrolarva/trello/issues/37)
  - Markdown support in card descriptions [#38](https://github.com/pedrolarva/trello/issues/38)
- **Low priority items (technical debt, optimizations)**
  - Smoother animations when adding or moving items [#39](https://github.com/pedrolarva/trello/issues/39)

### Q4
- **High priority items (bugs, critical features)**
  - Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage [#40](https://github.com/pedrolarva/trello/issues/40)
- **Medium priority items (enhancements, improvements)**
  - Simple activity log / history [#41](https://github.com/pedrolarva/trello/issues/41)
- **Low priority items (technical debt, optimizations)**
  - Internationalization (i18n) to support multiple languages [#42](https://github.com/pedrolarva/trello/issues/42)

## Feature Details

### Export/Import Data
- **User value proposition:** Allows users to back up their boards and transfer data between browsers or devices manually, ensuring they don't lose information if `localStorage` is cleared.
- **Technical approach (high-level):** Create functions to serialize the current `localStorage` state into a `.json` file for download. Create a file input to read a `.json` file and update `localStorage`.
- **Success criteria:** The user can download the complete data as a JSON file and successfully restore it in a clean session.
- **Estimated effort (Small/Medium/Large):** Small

### Support for Multiple Boards
- **User value proposition:** Helps in organizing different projects or life areas into completely separate boards.
- **Technical approach (high-level):** Update the data structure in `localStorage` to support an array of boards, each containing its own lists and cards. Create a sidebar menu or dropdown to switch between boards.
- **Success criteria:** The user can create, rename, delete, and switch between different boards without data mixing.
- **Estimated effort (Small/Medium/Large):** Large

### Due Dates
- **User value proposition:** Allows users to track task deadlines directly on the card.
- **Technical approach (high-level):** Add a date input field in the card edit modal. Save the date in the card object. Update the card interface to display the date and change color if the deadline is approaching or overdue.
- **Success criteria:** The user can set a date, view it on the card, and easily identify overdue tasks via visual cues.
- **Estimated effort (Small/Medium/Large):** Medium

### Optional Cloud Sync
- **User value proposition:** Enables using the same board across different devices (mobile and PC) in real-time while maintaining offline functionality.
- **Technical approach (high-level):** Utilize a BaaS (Backend as a Service) like Firebase Firestore. Sync local data with the cloud when an internet connection is available, using conflict resolution strategies.
- **Success criteria:** Data is automatically and correctly synced between two different devices logged into the same account.
- **Estimated effort (Small/Medium/Large):** Large

## Dependencies & Risks - Any blockers or concerns
- **LocalStorage Limitations:** Browser local storage has a size limit (typically 5MB) and can be accidentally wiped by the user when clearing browser data. We may need to investigate IndexedDB for larger limits.
- **Vanilla JS Scalability:** Maintaining the project without frameworks might make the code complex and harder to maintain as the application grows (technical debt). A clear architecture pattern will be required to manage state effectively.
- **Mobile Compatibility:** Native HTML5 Drag and Drop features can be inconsistent on mobile devices, potentially requiring polyfills or significant custom touch event handling.
