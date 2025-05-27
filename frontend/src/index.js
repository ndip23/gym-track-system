// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <<< Ensure this imports your Tailwind directives & base styles
import App from './App'; // Your main App component (can be .js or .jsx)
import reportWebVitals from './reportWebVitals'; // CRA specific
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { theme as muiTheme } from './theme/theme.js';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);

reportWebVitals();