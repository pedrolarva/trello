# Roadmap

## Vision & Goals
The objective of this project is to provide a simple, fast, and privacy-focused (local-first) web-based Kanban board built entirely with vanilla HTML, CSS, and JavaScript. We strive to offer an intuitive and responsive interface tailored for personal or small-team task management without relying on complex setups or heavy backend integrations. Our development priority remains on consistent, incremental value delivery.

## Current Status
The project currently has core foundational functionalities successfully implemented:
- Create, edit, rename, and delete lists (boards).
- Create, modify, edit descriptions, and delete cards.
- Drag and Drop functionality to seamlessly move cards between lists.
- Reliable data persistence utilizing the browser's native `localStorage`.
- Fully responsive design featuring horizontal scrolling.

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
  - Card Checklists: Allow adding simple sub-task checklists within individual cards.
  - [#11](https://github.com/pedrolarva/trello/issues/11) Theme customization (Dark Mode and color themes).
  - [#12](https://github.com/pedrolarva/trello/issues/12) Markdown support in card descriptions.
- Low priority items (technical debt, optimizations)
  - [#13](https://github.com/pedrolarva/trello/issues/13) Smoother animations when adding or moving items.

### Q4: Synchronization and Expansion
- High priority items (bugs, critical features)
  - [#14](https://github.com/pedrolarva/trello/issues/14) Optional Cloud Sync integration using services like Firebase or Supabase to allow multi-device usage.
- Medium priority items (enhancements, improvements)
  - Board Templates: Provide predefined structures (e.g., Agile Sprint, Weekly Planner) for rapid board creation.
  - [#15](https://github.com/pedrolarva/trello/issues/15) Simple activity log / history.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Enables users to back up their boards and transfer data manually between browsers or devices, ensuring they don't lose information if `localStorage` is cleared.
- Technical approach (high-level): Implement functions to serialize the current `localStorage` state into a `.json` file for download. Build a file input to read a `.json` file and safely update `localStorage`.
- Success criteria: The user can download the complete data as a JSON file and successfully restore it in a clean session without errors.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Helps users to organize entirely different projects, workflows, or life areas into completely separate, dedicated boards.
- Technical approach (high-level): Architect an update to the core data structure in `localStorage` to support an array of boards, where each board contains its own distinct lists and nested cards. Create a sidebar menu or header dropdown to seamlessly switch between boards.
- Success criteria: The user can fluidly create, rename, delete, and switch between different boards ensuring zero data mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Equips users with the ability to track task deadlines directly on the card face.
- Technical approach (high-level): Integrate a date input field within the card edit modal UI. Save the selected date string in the card object. Update the card rendering logic to prominently display the date and apply dynamic colors if the deadline is approaching or overdue.
- Success criteria: The user can successfully set a date, view it on the card exterior, and easily identify overdue tasks via distinct visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Delivers the capability of utilizing the exact same board across different devices (mobile and PC) in real-time while strictly maintaining core offline functionality.
- Technical approach (high-level): Leverage a lightweight BaaS (Backend as a Service) platform such as Firebase Firestore. Implement synchronization logic to sync local data with the cloud whenever an internet connection is available, utilizing sensible conflict resolution strategies.
- Success criteria: Task data is automatically, consistently, and correctly synced between two different devices authenticated into the same user account.
- Estimated effort: Large

### 5. Card Checklists
- User value proposition: Empowers users to break down complex tasks into smaller, manageable sub-tasks directly within a card to track granular progress.
- Technical approach (high-level): Extend the card data model to include an array of checklist items, tracking both the text and boolean completion status. Add a UI section within the card edit modal to create, remove, and toggle these items. Render a progress summary directly on the card front.
- Success criteria: Users can intuitively add checklist items, toggle their completion status, and instantly see the completion ratio update on both the modal and main board views.
- Estimated effort: Medium

### 6. Board Templates
- User value proposition: Significantly accelerates the setup process for new projects by offering ready-to-use, tailored board layouts for common workflows.
- Technical approach (high-level): Develop and hardcode a set of predefined JSON board structures. When creating a new board, present users with a dropdown to optionally select a template, thereby populating the initial `localStorage` state with relevant lists instead of starting blank.
- Success criteria: Users can successfully choose a functional template like "Agile" or "Weekly Planner" during board creation and immediately begin organizing tasks within a pre-populated set of relevant columns.
- Estimated effort: Small

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage enforces a strict size limit (typically around 5MB) and can be accidentally wiped by the user when clearing browser cache data. We will need to actively investigate migrating to `IndexedDB` for larger, more resilient storage limits.
- Vanilla JS Scalability: Exclusively maintaining the project without modern frameworks might significantly increase code complexity and make the application harder to maintain as the feature set grows (increasing technical debt). A very clear, robust architecture pattern will be strictly required to manage application state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop features are notoriously inconsistent on touch-based mobile devices, potentially requiring reliable polyfills or significant custom touch event handling to ensure a smooth user experience.
