import { create } from 'zustand';

// Load initial todos from localStorage or use default
const loadInitialTodos = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    try {
      return JSON.parse(savedTodos);
    } catch (error) {
      console.error('Error parsing saved todos:', error);
      return [];
    }
  }
  return [
    {
      id: 1,
      title: "Learn React Hooks",
      completed: false,
      priority: "High",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Complete practice project",
      completed: true,
      priority: "Medium",
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    }
  ];
};

const useTodoStore = create((set) => ({
  todos: loadInitialTodos(),
  
  addTodo: (title, priority = "Medium") => set((state) => {
    const newTodos = [
      ...state.todos,
      {
        id: crypto.randomUUID(),
        // I made the IDs be UUID strings instead of the integer ID's
        // However, it handles either data type
        title,
        completed: false,
        priority,
        createdAt: new Date().toISOString()
      }
    ];
    console.log(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  }),

  toggleTodo: (id) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  }),

  deleteTodo: (id) => set((state) => {
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  }),

  updateTodoPriority: (id, newPriority) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, priority: newPriority } : todo
    );
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  }),

  updateTodoTitle: (id, newTitle) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    localStorage.setItem('todos', JSON.stringify(newTodos));
    return { todos: newTodos };
  })
}));

export default useTodoStore; 