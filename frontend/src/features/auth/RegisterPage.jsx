// src/features/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, CircularProgress, Alert as MuiAlert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // If you have a register thunk in Redux
// import { registerUser } from './authSlice'; // Example Redux action
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Same icon as login for consistency or a user-add icon

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // For form-level errors
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, dispatch a register action:
      // const resultAction = await dispatch(registerUser({ fullName: formData.fullName, email: formData.email, password: formData.password })).unwrap();
      // setSuccessMessage(resultAction.message || "Registration successful! Please check your email or login.");
      // setTimeout(() => navigate('/login'), 3000);

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Registration data submitted:", {
        fullName: formData.fullName,
        email: formData.email,
        // Do not log password in real scenarios
      });
      setSuccessMessage("Registration successful! You can now log in.");
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); // Clear form
      // Optionally redirect after a delay or provide a link to login
      setTimeout(() => navigate('/login'), 2500);

    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fittrack-gray-100 p-4">
      <Paper className="p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md bg-white">
        <Box className="flex flex-col items-center mb-6">
          <AddCircleOutlineIcon className="text-fittrack-blue text-5xl mb-2" />
          <Typography variant="h4" component="h1" className="font-bold text-fittrack-blue">
            Create Account
          </Typography>
          <Typography variant="body2" className="text-fittrack-gray-600 mt-1">
            Join FitTrack Pro today!
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            autoFocus
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            helperText="Password must be at least 6 characters."
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <MuiAlert severity="error" className="w-full">{error}</MuiAlert>}
          {successMessage && <MuiAlert severity="success" className="w-full">{successMessage}</MuiAlert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="py-3 text-base font-semibold normal-case bg-fittrack-blue hover:bg-fittrack-blue-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
          </Button>
        </form>

        <Typography variant="body2" className="text-center mt-6 text-fittrack-gray-600">
          Already have an account?{' '}
          <RouterLink to="/login" className="font-medium text-fittrack-blue hover:underline">
            Log In
          </RouterLink>
        </Typography>
      </Paper>
    </div>
  );
};

export default RegisterPage;