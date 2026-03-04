# Project Roadmap

## Vision & Goals
Provide a fast, lightweight, and easy-to-use Kanban board right in the browser. The goal is to keep the application simple and dependency-free while offering essential productivity features.

## Current Status
The project has successfully established its core functionality. Users can create lists, add/edit/delete cards, and move them around using intuitive drag-and-drop. All data is persisted locally via the browser's `localStorage`.

## Quarterly Roadmap

### Q1
- **High Priority**
  - Fix drag-and-drop edge cases on mobile touch devices.
  - Implement basic data validation when creating/editing cards.
- **Medium Priority**
  - Add due dates to cards.
  - Implement Labels/Tags for better card categorization.
- **Low Priority**
  - Code refactoring: split monolithic JavaScript into smaller ES6 modules.

### Q2
- **High Priority**
  - Support for multiple independent boards.
- **Medium Priority**
  - Implement Dark Mode theme toggle.
- **Low Priority**
  - Improve keyboard navigation and overall accessibility (a11y).

### Q3
- **High Priority**
  - Export and Import data feature (JSON format).
- **Medium Priority**
  - Search and filter cards by text and labels.
- **Low Priority**
  - Add UI animations for smoother transitions.

### Q4
- **High Priority**
  - Optional Cloud Sync capability.
- **Medium Priority**
  - Markdown support in card descriptions.
- **Low Priority**
  - Performance optimizations and reducing memory footprint.

## Feature Details

### Multiple Boards
- **User value proposition:** Allows users to manage different projects or contexts separately without cluttering a single board.
- **Technical approach (high-level):** Update the `localStorage` schema to accommodate a list of boards. Create a sidebar or dropdown UI to switch the active board context.
- **Success criteria:** Users can create, delete, and seamlessly switch between multiple boards. Data persists independently for each board.
- **Estimated effort:** Medium

### Export and Import Data
- **User value proposition:** Gives users ownership of their data, enabling backups and the ability to migrate their boards between different devices.
- **Technical approach (high-level):** Provide a button to serialize the current `localStorage` state into a downloadable `.json` file. Provide an upload input to parse a `.json` file and overwrite the local state.
- **Success criteria:** A user can download their board data and upload it on a fresh browser session to completely restore their setup.
- **Estimated effort:** Small

### Cloud Sync
- **User value proposition:** Users can access their boards from multiple devices automatically, without manually exporting and importing data.
- **Technical approach (high-level):** Integrate a lightweight backend-as-a-service (BaaS). Add an optional authentication layer and sync local state with the cloud database.
- **Success criteria:** State changes are mirrored across multiple authenticated browser sessions.
- **Estimated effort:** Large

## Dependencies & Risks
- **Dependencies:** The core project intentionally relies on zero external dependencies. However, future features like Cloud Sync (Q4) will introduce external backend dependencies.
- **Risks:**
  - **Storage Limits:** Relying purely on `localStorage` has a typical 5MB limit, which might become an issue if users create a massive number of cards with long descriptions.
  - **Feature Creep:** Adding too many features risks bloating the application, conflicting with the original vision of being a simple, lightweight tool.
