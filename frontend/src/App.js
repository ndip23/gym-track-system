// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toolbar, CircularProgress, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './features/dashboard/DashboardPage';
import LoginPage from './features/auth/LoginPage';
import LandingPage from './features/landing/LandingPage';
import RegisterPage from './features/auth/RegisterPage';
import { loginSuccess, setAuthLoading } from './features/auth/authSlice';

import UserProfilePage from './features/profile/UserProfilePage';
import WorkoutPage from './features/workouts/WorkoutPage';
import DietPlanPage from './features/dietPlans/DietPlanPage';
import PaymentPage from './features/payments/PaymentPage';

// Defined in tailwind.config.js spacing as '65' (16.25rem for 260px)
const sidebarWidthClass = "w-65";
const mainContentPaddingClass = "sm:pl-65"; // For padding left of main content and AppBar content

const PlaceholderPage = ({ title }) => (
  <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white min-h-[calc(100vh-128px)] flex flex-col justify-center items-center"> {/* Adjusted min-height */}
    <Typography variant="h4" component="h1" className="font-bold text-fittrack-gray-900 mb-4">
      {title}
    </Typography>
    <div className="mt-6 p-6 border-2 border-dashed border-fittrack-gray-300 rounded-lg text-center">
      <Typography className="text-fittrack-gray-500 text-lg">
          Content for {title.toLowerCase()} will be implemented here.
      </Typography>
    </div>
  </Paper>
);


function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading: authIsLoading } = useSelector(state => state.auth);

  useEffect(() => {
    const previouslyLoggedInUser = localStorage.getItem('fitTrackProUser');
    if (previouslyLoggedInUser) {
      try {
        dispatch(loginSuccess(JSON.parse(previouslyLoggedInUser)));
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('fitTrackProUser');
        dispatch(setAuthLoading(false));
      }
    } else {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const publicFullPageRoutes = ['/', '/login', '/register'];
  const showLayout = isAuthenticated && !publicFullPageRoutes.includes(location.pathname);

  if (authIsLoading && !user && !localStorage.getItem('fitTrackProUser')) {
    return (
      <div className="flex items-center justify-center h-screen bg-fittrack-gray-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    // The outer div no longer needs to be `flex` for the desktop layout,
    // as sidebar is fixed and main content uses padding.
    // It could still be flex for other reasons if needed (e.g., centering login page).
    <div className={`min-h-screen ${!showLayout && (location.pathname === '/' || publicFullPageRoutes.includes(location.pathname)) ? 'bg-white' : 'bg-fittrack-gray-100'}`}>
      {showLayout && (
        <Sidebar // Sidebar is fixed, does not affect flow of main content
          drawerWidthClass={sidebarWidthClass}
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
        />
      )}
      {showLayout && (
        <Navbar // Navbar is fixed, its content needs padding
          onDrawerToggle={handleDrawerToggle}
          drawerPaddingClass={mainContentPaddingClass}
        />
      )}
      <main
        className={`transition-all duration-200 ease-in-out 
                    ${showLayout ? `pt-16 bg-fittrack-gray-100` : ''} {/* pt-16 for AppBar height */}
                    ${showLayout ? mainContentPaddingClass : ''}`} // Apply PADDING when layout is shown
      >
        {/* No Toolbar spacer needed here if main has pt-16 */}
        <div className={`${showLayout ? 'p-4 sm:p-6 max-w-screen-xl w-full' : 'w-full h-full'}`}> {/* Removed mx-auto as not needed with pl padding */}
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
            <Route path="/workouts" element={isAuthenticated ? <WorkoutPage/> : <Navigate to="/login" replace />} />
            <Route path="/diet-plan" element={isAuthenticated ? <DietPlanPage/> : <Navigate to="/login" replace />} />
            <Route path="/payment" element={isAuthenticated ? <PaymentPage/> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" replace />} />
            {isAuthenticated && <Route path="*" element={<Navigate to="/dashboard" replace />} />}
            {!isAuthenticated && !publicFullPageRoutes.includes(location.pathname) && (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;