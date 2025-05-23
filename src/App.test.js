import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';

// Mock the crypto package
jest.mock('crypto', () => ({
  randomUUID: () => 'mock-uuid-123'
}));

// Mock the child components to simplify testing
jest.mock('./components/TodoStats', () => () => <div data-testid="todo-stats">TodoStats</div>);
jest.mock('./components/TodoForm', () => () => <div data-testid="todo-form">TodoForm</div>);
jest.mock('./components/TodoList', () => () => <div data-testid="todo-list">TodoList</div>);
jest.mock('./components/ErrorBoundary', () => ({ children }) => <div data-testid="error-boundary">{children}</div>);

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('App Component', () => {
  test('renders the main heading', () => {
    renderWithTheme(<App />);
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
  });

  test('renders all main components', () => {
    renderWithTheme(<App />);
    
    // Check if all main components are rendered
    expect(screen.getByTestId('todo-stats')).toBeInTheDocument();
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  test('wraps components in error boundaries', () => {
    renderWithTheme(<App />);
    
    // Check if error boundaries are present
    const errorBoundaries = screen.getAllByTestId('error-boundary');
    expect(errorBoundaries.length).toBeGreaterThan(0);
  });

  test('maintains correct layout structure', () => {
    renderWithTheme(<App />);
    
    // Check if the main layout classes are present
    expect(screen.getByRole('main')).toHaveClass('App-main');
    expect(screen.getByRole('banner')).toHaveClass('App-header');
  });
}); 