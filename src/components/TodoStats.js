import React from 'react';
import useTodoStore from '../store/todoStore';
import { Box, Typography, Paper, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';

const TodoStats = () => {
  const todos = useTodoStore(state => state.todos);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  
  const getHighestPriorityOpenTask = todos
    .filter(todo => !todo.completed)
    .sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })[0];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error.contrastText';
      case 'Medium':
        return 'warning.contrastText';
      case 'Low':
        return 'info.contrastText';
      default:
        return 'info.contrastText';
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error.light';
      case 'Medium':
        return 'warning.light';
      case 'Low':
        return 'info.main';
      default:
        return 'info.light';
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Top row with Completed and Pending */}
      <Box sx={{ 
        display: 'flex',
        gap: 2, 
        mb: 2
      }}>
        {/* Completed Card */}
        <Paper sx={{ 
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'success.light',
          color: 'success.contrastText'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CheckCircleIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Completed</Typography>
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {completedTodos}
          </Typography>
          <Typography variant="body2">
            {((completedTodos / totalTodos) * 100 || 0).toFixed(1)}% of total
          </Typography>
        </Paper>

        {/* Pending Card */}
        <Paper sx={{ 
          flex: 1, 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'warning.light',
          color: 'warning.contrastText'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PendingIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Pending</Typography>
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {pendingTodos}
          </Typography>
          <Typography variant="body2">
            {((pendingTodos / totalTodos) * 100 || 0).toFixed(1)}% of total
          </Typography>
        </Paper>
      </Box>

      {/* Total Card */}
      <Paper sx={{ 
        p: 2,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AssignmentIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Total Tasks</Typography>
        </Box>
        <Typography variant="h3">
          {totalTodos}
        </Typography>
      </Paper>

      {/* Highest Priority Task - Only Shows if there is an incomplete task*/}
      {getHighestPriorityOpenTask && (
        <Paper sx={{ 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: getPriorityBgColor(getHighestPriorityOpenTask.priority),
          color: getPriorityColor(getHighestPriorityOpenTask.priority)
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FlagIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Highest Priority Task</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Checkbox
              checked={getHighestPriorityOpenTask.completed}
              onChange={() => toggleTodo(getHighestPriorityOpenTask.id)}
              sx={{ p: 0, mr: 1, color: `${getPriorityColor(getHighestPriorityOpenTask.priority)}` }}
            />
            <Typography variant="body1">
              {getHighestPriorityOpenTask.title}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TodoStats; 