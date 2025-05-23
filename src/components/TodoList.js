import React, { useState, useMemo } from 'react';
import useTodoStore from '../store/todoStore';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack,
  InputAdornment,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'error.main';
    case 'Medium':
      return 'warning.main';
    case 'Low':
      return 'info.main';
    default:
      return 'text.secondary';
  }
};

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const updateTodoPriority = useTodoStore(state => state.updateTodoPriority);
  const updateTodoTitle = useTodoStore(state => state.updateTodoTitle);

  // State for sorting and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterCompleted, setFilterCompleted] = useState('all');
  
  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply completion filter
    if (filterCompleted !== 'all') {
      const showCompleted = filterCompleted === 'completed';
      result = result.filter(todo => todo.completed === showCompleted);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'completed':
          comparison = (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [todos, searchQuery, sortField, sortDirection, filterCompleted]);
  
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingTodo && editTitle.trim()) {
      updateTodoTitle(editingTodo.id, editTitle.trim());
      setEditDialogOpen(false);
      setEditingTodo(null);
      setEditTitle('');
    }
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditingTodo(null);
    setEditTitle('');
  };

  const handlePrioritySelect = (todoId, newPriority) => {
    updateTodoPriority(todoId, newPriority);
  };

  return (
    <Paper sx={{ p: 2, height: 'auto' }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', '& .MuiSelect-select': { width: 'auto' } }}>
          <TextField
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              label="Sort By"
              onChange={(e) => setSortField(e.target.value)}
              variant='outlined'
            >
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Task Name</MenuItem>
              <MenuItem value="createdAt">Created Date</MenuItem>
              <MenuItem value="completed">Completion</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort Direction</InputLabel>
            <Select
              value={sortDirection}
              label="Sort Direction"
              onChange={(e) => setSortDirection(e.target.value)}
              variant='outlined'
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Show</InputLabel>
            <Select
              value={filterCompleted}
              label="Show"
              onChange={(e) => setFilterCompleted(e.target.value)}
              variant='outlined'
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Task</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Created</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedTodos.length > 0 ? (
              filteredAndSortedTodos.map((todo) => (
                <TableRow
                  key={todo.id}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {todo.title}
                      </Typography>
                      <Tooltip title="Edit task">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(todo)}
                          sx={{ 
                            opacity: 0.6,
                            '&:hover': { opacity: 1 }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <Select
                        value={todo.priority}
                        onChange={(e) => handlePrioritySelect(todo.id, e.target.value)}
                        sx={{
                          color: getPriorityColor(todo.priority),
                          fontWeight: 'medium',
                          '& .MuiSelect-select': {
                            py: 0.5,
                          },
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                        variant='outlined'
                      >
                        <MenuItem value="High" sx={{ color: getPriorityColor('High') }}>
                          High
                        </MenuItem>
                        <MenuItem value="Medium" sx={{ color: getPriorityColor('Medium') }}>
                          Medium
                        </MenuItem>
                        <MenuItem value="Low" sx={{ color: getPriorityColor('Low') }}>
                          Low
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton
                        onClick={() => deleteTodo(todo.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {searchQuery || filterCompleted !== 'all' 
                      ? 'No tasks match your current filters'
                      : 'No tasks yet. Add one above!'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleEditCancel} sx={{ '& .MuiDialog-paper': { width: 400 } }}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleEditSave();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} variant="outlined">Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" disabled={!editTitle.trim()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TodoList; 