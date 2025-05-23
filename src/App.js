import React from 'react';
import TodoStats from './components/TodoStats';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
        <h1>Task Management App</h1>
      </header>
      <ErrorBoundary key="app">
        <main className="App-main">
          <div className="left-column">
            <ErrorBoundary key="todo-stats">
              <TodoStats />
            </ErrorBoundary>
          </div>
          <div className="right-column">
            <ErrorBoundary key="todo-form">
              <TodoForm />
            </ErrorBoundary>
            <ErrorBoundary key="todo-list">
              <TodoList />
            </ErrorBoundary>
          </div>
        </main>
      </ErrorBoundary>
    </div>
    </ThemeProvider>
  );
}

export default App;
