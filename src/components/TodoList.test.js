import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import TodoList from './TodoList';
import useTodoStore from '../store/todoStore';

// Mock the store
jest.mock('../store/todoStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockTodos = [
  { 
    id: '1', 
    title: 'HP Task',
    completed: false, 
    priority: 'High',
    createdAt: '2024-03-20T10:00:00.000Z'
  },
  { 
    id: '2', 
    title: 'MP Task',
    completed: true, 
    priority: 'Medium',
    createdAt: '2024-03-20T11:00:00.000Z'
  },
  { 
    id: '3', 
    title: 'LP Task',
    completed: false, 
    priority: 'Low',
    createdAt: '2024-03-20T12:00:00.000Z'
  }
];

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TodoList Component', () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockUpdateTodoPriority = jest.fn();
  const mockUpdateTodoTitle = jest.fn();

  beforeEach(() => {
    useTodoStore.mockImplementation((selector) => selector({
      todos: mockTodos,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      updateTodoPriority: mockUpdateTodoPriority,
      updateTodoTitle: mockUpdateTodoTitle
    }));
    mockToggleTodo.mockClear();
    mockDeleteTodo.mockClear();
    mockUpdateTodoPriority.mockClear();
    mockUpdateTodoTitle.mockClear();
  });

  test('renders all todos', () => {
    renderWithTheme(<TodoList />);
    
    expect(screen.getByText('HP Task')).toBeInTheDocument();
    expect(screen.getByText('MP Task')).toBeInTheDocument();
    expect(screen.getByText('LP Task')).toBeInTheDocument();
  });

  test('filters todos based on search query', () => {
    renderWithTheme(<TodoList />);
    
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'HP' } });
    
    expect(screen.getByText('HP Task')).toBeInTheDocument();
    expect(screen.queryByText('MP Task')).not.toBeInTheDocument();
    expect(screen.queryByText('LP Task')).not.toBeInTheDocument();
  });

  test('filters todos based on completion status', () => {
    renderWithTheme(<TodoList />);
    
    // The third combobox is the 'Show' filter
    const comboboxes = screen.getAllByRole('combobox');
    const filterSelect = comboboxes[2];
    fireEvent.mouseDown(filterSelect);
    const completedOption = screen.getAllByRole('option').find(opt => opt.textContent.match(/completed/i));
    fireEvent.click(completedOption);
    
    expect(screen.getByText('MP Task')).toBeInTheDocument();
    expect(screen.queryByText('HP Task')).not.toBeInTheDocument();
    expect(screen.queryByText('LP Task')).not.toBeInTheDocument();
  });

  test('sorts todos by priority', () => {
    renderWithTheme(<TodoList />);
    
    // The first combobox is the 'Sort By' select
    const comboboxes = screen.getAllByRole('combobox');
    const sortSelect = comboboxes[0];
    fireEvent.mouseDown(sortSelect);
    const priorityOption = screen.getAllByRole('option').find(opt => opt.textContent.match(/priority/i));
    fireEvent.click(priorityOption);
    
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    expect(rows[0]).toHaveTextContent('HP Task');
    expect(rows[1]).toHaveTextContent('MP Task');
    expect(rows[2]).toHaveTextContent('LP Task');
  });

  test('toggles todo completion status', () => {
    renderWithTheme(<TodoList />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    
    expect(mockToggleTodo).toHaveBeenCalledWith('1');
  });

  test('deletes todo', () => {
    renderWithTheme(<TodoList />);
    
    // Find the delete button in the first row
    const firstRow = screen.getByText('HP Task').closest('tr');
    const deleteButton = firstRow.querySelector('button[class*="MuiIconButton-colorError"]');
    fireEvent.click(deleteButton);
    
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  test('edits todo title', () => {
    renderWithTheme(<TodoList />);
    
    // Find and click the edit button in the first row
    const firstRow = screen.getByText('HP Task').closest('tr');
    const editButton = firstRow.querySelector('button[aria-label="Edit task"]');
    fireEvent.click(editButton);
    
    // Find and update the edit input
    const editInput = screen.getByRole('textbox');
    fireEvent.change(editInput, { target: { value: 'Updated Task' } });
    
    // Find and click the save button
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    expect(mockUpdateTodoTitle).toHaveBeenCalledWith('1', 'Updated Task');
  });
}); 