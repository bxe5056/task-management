import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import TodoForm from './TodoForm';
import useTodoStore from '../store/todoStore';

// Mock the store
jest.mock('../store/todoStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('TodoForm Component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    useTodoStore.mockImplementation((selector) => selector({
      addTodo: mockAddTodo
    }));
    mockAddTodo.mockClear();
  });

  test('renders form elements', () => {
    renderWithTheme(<TodoForm />);
    
    expect(screen.getByLabelText('Add a new task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  test('adds todo when form is submitted with valid input', () => {
    renderWithTheme(<TodoForm />);
    
    const input = screen.getByLabelText('Add a new task');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    expect(mockAddTodo).toHaveBeenCalledWith('New Task', 'Medium');
  });

  test('resets form after successful submission', () => {
    renderWithTheme(<TodoForm />);

    const input = screen.getByLabelText('Add a new task');
    const submitButton = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);

    expect(input.value).toBe('');
  });

  test('submit button is disabled when input is empty', () => {
    renderWithTheme(<TodoForm />);

    const submitButton = screen.getByRole('button', { name: 'Add Task' });
    expect(submitButton).toBeDisabled();

    const input = screen.getByLabelText('Add a new task');
    fireEvent.change(input, { target: { value: 'New Task' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('does not add todo when form is submitted with empty input', () => {
    renderWithTheme(<TodoForm />);

    const submitButton = screen.getByRole('button', { name: 'Add Task' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});