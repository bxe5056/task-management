# React Todo App with Filtering and Sorting

## Overview

Create a functional todo (task) application with filtering, sorting, and basic statistics.

## Live demo

[https://leidos.bentheitguy.me](https://leidos.bentheitguy.me)

## Implemented Features

1. **Todo Management**

   - ✅ Add new todos with a title and priority level (Low, Medium, High)
   - ✅ Mark todos as completed (and uncompleted)
   - ✅ Delete todos
   - ✅ Edit existing todo titles (via dialog)
   - ✅ Edit todo priorities inline

2. **Advanced Filtering & Sorting**

   - ✅ Filter todos by completion status (All, Active, Completed)
   - ✅ Search todos by title
   - ✅ Sort by multiple fields (Priority, Task Name, Created Date, Completion)
   - ✅ Sort direction control (Ascending/Descending)

3. **Enhanced Statistics Summary**
   - ✅ Display count of total/active/completed todos with percentages of the total
   - ✅ Show the highest priority incomplete todo (interactive)
   - ✅ Visual cards with icons and color coding

### Technical Implementation

1. **State Management**

   - ✅ Uses Zustand instead of useState for global state management
   - ✅ Local storage persistence implemented

2. **Component Structure**

   - ✅ TodoForm (for adding new todos)
   - ✅ TodoList (for displaying and managing todos with advanced table view)
   - ✅ TodoStats (for showing enhanced statistics)
   - ✅ ErrorBoundary component for error handling

3. **Modern UI/Styling**
   - ✅ Material-UI (MUI) component library
   - ✅ Custom theme with color-coded priorities
   - ✅ Responsive design with mobile-friendly layout
   - ✅ Table layout with search functionality

### Bonus Features

- ✅ **Local storage persistence** - All todos are automatically saved to browser storage
- ✅ **Edit functionality** - Edit todo titles and priorities
- ✅ **Comprehensive testing** - Component tests using React Test Suite / Jest
- ✅ **Error boundaries** - Graceful error handling

## Technology Stack

- **React 19** - Latest React version with modern hooks
- **Zustand** - Lightweight state management
- **Material-UI (MUI)** - Professional React component library
- **Material Icons** - Consistent iconography
- **React Testing Library** - Comprehensive component testing

## Data Structure

The application uses the following enhanced data structure:

```javascript
const initialTodos = [
  {
    id: "uuid-string",
    // Uses crypto.randomUUID() instead of integer for unique IDs
    // Integer IDs are still supported, but new tasks are UUIDs
    title: "Learn React Hooks",
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: "uuid-string-2",
    title: "Complete practice project",
    completed: true,
    priority: "Medium",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];
```

## Project Structure

```
src/
├── components/
│   ├── TodoForm.js          # Enhanced form with MUI components
│   ├── TodoList.js          # Advanced table with filtering/sorting
│   ├── TodoStats.js         # Enhanced statistics dashboard
│   ├── ErrorBoundary.js     # Error handling component
│   └── *.test.js           # Comprehensive test files
├── store/
│   └── todoStore.js        # Zustand state management
├── theme.js                # Material-UI custom theme
└── App.js                  # Main app with layout
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Available Scripts

```bash
npm run start    # Run development server
npm run test     # Run test suite
npm run build    # Build for production
```

### Dependencies

- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `zustand` - State management
- `@testing-library/*` - Testing utilities

## Testing

The project includes tests via react-testing/Jest for all components:

- `TodoForm.test.js` - Form functionality and validation
- `TodoList.test.js` - List operations and filtering
- `TodoStats.test.js` - Statistics calculations
- `App.test.js` - Integration testing

Run the tests with: `npm test`
