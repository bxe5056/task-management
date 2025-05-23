import React, { useState } from 'react';
import useTodoStore from '../store/todoStore';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack
} from '@mui/material';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const addTodo = useTodoStore(state => state.addTodo);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, priority);
      setText('');
      setPriority('Medium');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, backgroundColor: '#fff', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.08)', '& .MuiSelect-select': { width: 'auto' } }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
        />
        <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            fullWidth
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
            variant="outlined"
            sx={{
              color: getPriorityColor(priority)
            }}
            data-testid="priority-select"
            aria-label="Priority Select"
          >
            <MenuItem value="High" sx={{ color: getPriorityColor('High')}} data-testid="high-priority-option" aria-label="High Priority">High</MenuItem>
            <MenuItem value="Medium" sx={{ color: getPriorityColor('Medium') }} data-testid="medium-priority-option" aria-label="Medium Priority">Medium</MenuItem>
            <MenuItem value="Low" sx={{ color: getPriorityColor('Low') }} data-testid="low-priority-option" aria-label="Low Priority">Low</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!text.trim()}
          sx={{ minWidth: 100, fontSize: '12px', fontWeight: 'bold', color: 'tertiary.contrastText', backgroundColor: 'tertiary.main' }}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoForm; 