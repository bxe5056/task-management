import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Vibrant blue
      light: 'rgba(25, 118, 210, 0.1)',
      dark: '#1565c0',
    },
    secondary: {
      main: '#6c757d', // Greyish
    },
    tertiary: {
      main: '#2c3e50',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6fa', // Soft background
      paper: '#fff',
    },
    success: {
      main: '#43a047',
    },
    warning: {
      main: '#ffa726',
    },
    error: {
      main: '#e53935',
      dark: '#c62828',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d',
      disabled: '#adb5bd',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 800,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

// Add CSS variables to the document
const root = document.documentElement;
root.style.setProperty('--background-default', theme.palette.background.default);
root.style.setProperty('--background-paper', theme.palette.background.paper);
root.style.setProperty('--background-header', theme.palette.tertiary.main);
root.style.setProperty('--background-header-text', theme.palette.tertiary.contrastText);
root.style.setProperty('--text-primary', theme.palette.text.primary);
root.style.setProperty('--text-secondary', theme.palette.text.secondary);
root.style.setProperty('--text-disabled', theme.palette.text.disabled);
root.style.setProperty('--primary-main', theme.palette.primary.main);
root.style.setProperty('--primary-light', theme.palette.primary.light);
root.style.setProperty('--primary-dark', theme.palette.primary.dark);
root.style.setProperty('--error-main', theme.palette.error.main);
root.style.setProperty('--error-light', theme.palette.error.light);
root.style.setProperty('--error-dark', theme.palette.error.dark);
root.style.setProperty('--border-radius', `${theme.shape.borderRadius}px`);
root.style.setProperty('--shadow-default', theme.components.MuiPaper.styleOverrides.root.boxShadow);
root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.12)');
root.style.setProperty('--text-on-primary', '#ffffff');
root.style.setProperty('--text-on-error', '#ffffff');

export default theme; 