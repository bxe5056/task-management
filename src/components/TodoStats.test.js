import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import TodoStats from './TodoStats';
import useTodoStore from '../store/todoStore';

// Mock the store
jest.mock('../store/todoStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockTodos = [
  { id: '1', title: 'Task 1', completed: true, priority: 'High' },
  { id: '2', title: 'Task 2', completed: false, priority: 'Medium' },
  { id: '3', title: 'Task 3', completed: false, priority: 'Low' }
];

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TodoStats Component', () => {
  beforeEach(() => {
    useTodoStore.mockImplementation((selector) => selector({
      todos: mockTodos,
      toggleTodo: jest.fn()
    }));
  });

  test('renders completed and pending task counts', () => {
    renderWithTheme(<TodoStats />);
    
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed tasks
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending tasks
    expect(screen.getByText('3')).toBeInTheDocument(); // Total tasks
  });

  test('displays correct percentage calculations', () => {
    renderWithTheme(<TodoStats />);
    
    const completedPercentage = screen.getByText('33.3% of total');
    const pendingPercentage = screen.getByText('66.7% of total');
    
    expect(completedPercentage).toBeInTheDocument();
    expect(pendingPercentage).toBeInTheDocument();
  });

  test('shows highest priority task', () => {
    renderWithTheme(<TodoStats />);
    
    expect(screen.getByText('Task 2')).toBeInTheDocument(); // Medium priority task
  });

  test('handles empty todo list', () => {
    useTodoStore.mockImplementation((selector) => selector({
      todos: [],
      toggleTodo: jest.fn()
    }));
    
    renderWithTheme(<TodoStats />);
    
    // There should be three h3s with text '0' (completed, pending, total)
    const zeroHeadings = screen.getAllByText('0', { selector: 'h3' });
    expect(zeroHeadings).toHaveLength(3);
    
    const percentageTexts = screen.getAllByText('0.0% of total');
    expect(percentageTexts).toHaveLength(2); // Both completed and pending should show 0%
  });

  test('toggles todo when checkbox is clicked', () => {
    const mockToggleTodo = jest.fn();
    useTodoStore.mockImplementation((selector) => selector({
      todos: mockTodos,
      toggleTodo: mockToggleTodo
    }));
    
    renderWithTheme(<TodoStats />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockToggleTodo).toHaveBeenCalled();
  });
}); 