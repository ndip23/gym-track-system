// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const muiPalette = {
  primary: { main: '#1976D2' },
  secondary: { main: '#4a5568' },
  error: { main: '#f44336' },
  warning: { main: '#ff9800' },
  success: { main: '#4caf50' },
  background: { paper: '#ffffff', default: '#f7fafc' },
  text: { primary: '#1a202c', secondary: '#4a5568' }
};

export const theme = createTheme({
  palette: muiPalette,
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    button: {
        textTransform: 'none',
        fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiAppBar: { defaultProps: { elevation: 0, color: "inherit" } }
  }
});