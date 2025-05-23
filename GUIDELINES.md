# React Todo App with Filtering and Sorting

## Overview

Create a functional todo application with filtering, sorting, and basic statistics. This project should be completable within 2 hours while still demonstrating important React concepts.

## Requirements

### Core Features

1. **Todo Management**

   - Add new todos with a title and priority level (Low, Medium, High)
   - Mark todos as completed
   - Delete todos

2. **Filtering & Sorting**

   - Filter todos by status (All, Active, Completed)
   - Filter todos by priority level
   - Sort todos by creation date or priority

3. **Statistics Summary**
   - Display count of total/active/completed todos
   - Show the highest priority incomplete todo

### Technical Requirements

1. **State Management**

   - Use React's useState and useEffect hooks
   - Optionally use useReducer for more complex state logic

2. **Component Structure**

   - Create at least 3 separate components:
     - TodoForm (for adding new todos)
     - TodoList (for displaying and managing todos)
     - TodoStats (for showing statistics)

3. **Styling**
   - Basic responsive design (usable on mobile and desktop)
   - Visual indication of priority levels (colors, icons, etc.)

## Data Structure

Use the following data structure for todos:

```javascript
const initialTodos = [
  {
    id: 1,
    title: "Learn React Hooks",
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Complete practice project",
    completed: true,
    priority: "Medium",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];
```

## Implementation Steps

1. **Setup Project** (5 minutes)

   - Create a new React project with Create React App or Vite

2. **Create Components** (45 minutes)

   - Implement the form for adding todos
   - Create the todo list with completion toggle and delete functionality
   - Build the statistics component

3. **Add Filtering & Sorting** (30 minutes)

   - Implement filter controls
   - Add sorting functionality

4. **Styling and Polish** (30 minutes)

   - Style the components
   - Add responsive design
   - Implement visual priority indicators

5. **Testing & Bug Fixes** (10 minutes)
   - Test all functionality
   - Fix any issues

## Bonus Features (If Time Permits)

- Add local storage persistence
- Add edit functionality for existing todos
- Implement keyboard shortcuts
- Add due dates for todos

## Evaluation Criteria

- Functionality of all required features
- Code organization and component structure
- Proper use of React hooks
- UI/UX considerations
- Code readability and best practices

## Getting Started

Here's some starter code for the App component:

```jsx
import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Add todo handler
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        ...todo,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Get filtered and sorted todos
  const getFilteredTodos = () => {
    return todos
      .filter((todo) => {
        // Status filter
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) => {
        // Priority filter
        if (priorityFilter !== "all") return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === "priority") {
          const priorityValues = { Low: 1, Medium: 2, High: 3 };
          return priorityValues[b.priority] - priorityValues[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Filter and Sort Controls */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
```

This starter code demonstrates the core functionality and structure you need to implement. You'll need to create the TodoForm, TodoList, and TodoStats components to complete the assignment.

Good luck!
