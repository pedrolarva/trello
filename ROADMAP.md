# Roadmap

## Vision & Goals
The primary goal of this project is to deliver a simple, exceptionally fast, and privacy-centric web-based Kanban board built from scratch with vanilla HTML, CSS, and JavaScript. It is designed to offer a highly intuitive and responsive interface tailored for personal productivity and small-team task management without any heavy backends or complex setups. Our focus remains heavily on consistent, incremental value delivery.

## Current Status
The project currently provides the following core capabilities and functionalities out of the box:
- Creating, editing, and deleting customizable lists (boards).
- Creating, modifying, and safely deleting individual cards.
- Seamless Drag and Drop interactions for moving cards smoothly across different lists.
- Reliable data persistence directly through the browser's native `localStorage`.
- A fully responsive frontend design with horizontal scrolling tailored for varied screen sizes.

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
  - Customizing list background colors to help quickly visually differentiate task columns.
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
  - Role-based access control (RBAC) to support varied user permissions on shared boards.
- Low priority items (technical debt, optimizations)
  - [#16](https://github.com/pedrolarva/trello/issues/16) Internationalization (i18n) to support multiple languages.

## Feature Details

### 1. Export/Import Data ([#6](https://github.com/pedrolarva/trello/issues/6))
- User value proposition: Allows users to safely back up their boards and transfer data seamlessly between browsers or devices manually, ensuring they don't lose critical information if `localStorage` is cleared.
- Technical approach (high-level): Create functions to serialize the current `localStorage` application state into a standard `.json` file for download. Build a straightforward file input handler to read an uploaded `.json` file and overwrite `localStorage` securely.
- Success criteria: The user can immediately download their complete workspace data as a JSON file and successfully restore it perfectly in a fresh session.
- Estimated effort: Small

### 2. Support for Multiple Boards ([#10](https://github.com/pedrolarva/trello/issues/10))
- User value proposition: Greatly helps in intuitively organizing distinct projects, departments, or life areas into completely separate, uncluttered boards.
- Technical approach (high-level): Update the core data structure in `localStorage` to handle an array of individual board objects, each safely containing its own dedicated lists and cards. Implement a modern sidebar menu or intuitive dropdown to switch actively between the boards.
- Success criteria: The user can reliably create, rename, delete, and switch between completely different boards without any accidental data mixing.
- Estimated effort: Large

### 3. Due Dates ([#7](https://github.com/pedrolarva/trello/issues/7))
- User value proposition: Empowers users to accurately track vital task deadlines directly on the card interface without opening them.
- Technical approach (high-level): Integrate a standard HTML5 date input field into the card edit modal. Save the selected date timestamp within the card object in state. Upgrade the card rendering logic to display the date prominently and dynamically shift its color if the deadline is fast approaching or fully overdue.
- Success criteria: The user can seamlessly set a target date, view it clearly on the active card, and easily identify any overdue tasks instantly via noticeable visual cues.
- Estimated effort: Medium

### 4. Optional Cloud Sync ([#14](https://github.com/pedrolarva/trello/issues/14))
- User value proposition: Safely enables using the exact same updated board across completely different devices (e.g., mobile phones and desktop PCs) in near real-time while fully maintaining local offline functionality.
- Technical approach (high-level): Utilize a robust BaaS (Backend as a Service) solution like Firebase Firestore. Automatically sync local client data with the remote cloud database whenever a stable internet connection is detected, carefully utilizing solid conflict resolution strategies to prevent data loss.
- Success criteria: Card data is automatically, accurately, and rapidly synced between two entirely different remote devices actively logged into the same central account.
- Estimated effort: Large

### 5. Customizing list background colors
- User value proposition: Allows users to deeply personalize their daily workspace and easily distinguish between various lists based on unique customized visual cues.
- Technical approach (high-level): Embed an interactive visual color picker directly next to the list title header. Safely store the selected user color hex code in the list object inside `localStorage` and update the active UI styling dynamically to render the specifically chosen background color.
- Success criteria: Users can natively select, instantly apply, and successfully persist custom background colors for individual lists, which then reload completely correctly on all subsequent page visits.
- Estimated effort: Small

### 6. Role-based access control (RBAC)
- User value proposition: Securely protects sensitive organizational data and proactively limits exactly what specific user roles can modify or view in a shared, multi-user environment.
- Technical approach (high-level): Expand the overall user authentication schema to include discrete role definitions (e.g., admin, editor, basic viewer). Dynamically check assigned roles exclusively on the client side to immediately restrict active UI actions and enforce overarching permissions securely via strict backend data rules.
- Success criteria: Assorted viewers can only passively see boards, authenticated editors can actively modify core content, and administrative admins can securely manage overarching user sharing or delete the entire board entirely.
- Estimated effort: Medium

## Dependencies & Risks
- LocalStorage Limitations: Browser local storage typically imposes a hard size limit (usually around 5MB) and can easily be accidentally wiped by the end user when routinely clearing their browser cache data. We will likely need to actively investigate leveraging IndexedDB for significantly larger storage limits.
- Vanilla JS Scalability: Maintaining the sprawling project strictly without modern frontend frameworks might slowly make the underlying code overly complex and much harder to maintain smoothly as the entire application grows (accumulating technical debt). A very clear, strict architecture pattern will be required to manage complex reactive state effectively.
- Mobile Compatibility: Native HTML5 Drag and Drop core features can prove highly inconsistent across various mobile devices and distinct browsers, potentially requiring custom polyfills or significant overarching custom touch event handling rewrites.
