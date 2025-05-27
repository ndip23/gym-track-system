// src/features/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from './authSlice'; // Assuming this action exists
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@example.com'); // Default for quick login
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      let mockUser = null;
      if (email === 'user@example.com' && password === 'password123') {
        mockUser = { id: 'usr123', fullName: 'John Doe', email: 'user@example.com', role: 'User', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg' };
      } else if (email === 'admin@example.com' && password === 'password123') {
        mockUser = { id: 'adm001', fullName: 'Jane Admin', email: 'admin@example.com', role: 'Admin', avatarUrl: 'https://mui.com/static/images/avatar/2.jpg' };
      }

      if (mockUser) {
        dispatch(loginSuccess(mockUser));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fittrack-gray-100 p-4">
      <Paper className="p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md">
        <Box className="flex flex-col items-center mb-6">
          <AddCircleOutlineIcon className="text-fittrack-blue text-5xl mb-2" />
          <Typography variant="h4" component="h1" className="font-bold text-fittrack-blue">
            FitTrack Pro
          </Typography>
        </Box>
        <form onSubmit={handleLogin} className="space-y-6">
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" className="text-sm text-center">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Uses MUI theme primary
            className="py-3 text-base font-semibold normal-case bg-fittrack-blue hover:bg-fittrack-blue-dark"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" className="text-center mt-6 text-fittrack-gray-600">
          Demo: user@example.com / password123 <br/>
          admin@example.com / password123
        </Typography>
      </Paper>
    </div>
  );
};

export default LoginPage;