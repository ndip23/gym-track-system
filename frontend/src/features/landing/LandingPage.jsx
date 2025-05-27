// src/features/landing/LandingPage.jsx
import React from 'react';
import { Button, Paper, Box, Container, Typography, Grid } from '@mui/material'; // Removed Avatar as it's not used here
import { Link as RouterLink } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AppBar, Toolbar } from '@mui/material'; // AppBar and Toolbar are used for the landing page navbar

// Hero Background Image (Replace with your own or a high-quality stock photo)
const heroImageUrl = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={0}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col items-center text-center"
  >
    <div className="text-fittrack-blue text-4xl mb-4">{icon}</div>
    <Typography variant="h6" component="h3" className="font-semibold text-fittrack-gray-800 mb-2">{title}</Typography>
    <Typography variant="body2" className="text-fittrack-gray-600 leading-relaxed flex-grow"> {/* flex-grow helps if content varies */}
      {description}
    </Typography>
  </Paper>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Base background */}
      {/* Simple Navbar for Landing Page */}
      <AppBar position="sticky" className="bg-white/90 backdrop-blur-md shadow-sm border-b border-fittrack-gray-200">
        <Toolbar className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Box className="flex items-center">
            <FitnessCenterIcon className="text-fittrack-blue text-3xl mr-2" /> {/* Changed icon for logo consistency */}
            <Typography variant="h5" component={RouterLink} to="/" className="font-bold text-fittrack-blue no-underline hover:opacity-80 transition-opacity">
              FitTrack Pro
            </Typography>
          </Box>
          <Box>
            <Button component={RouterLink} to="/login" variant="outlined" className="normal-case text-fittrack-blue border-fittrack-blue hover:bg-fittrack-blue/10 mr-2 sm:mr-3 px-3 sm:px-4">
              Login
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" className="bg-fittrack-blue hover:bg-fittrack-blue-dark text-white normal-case px-3 sm:px-4 ">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        className="relative flex-grow flex items-center justify-center text-white py-20 sm:py-32 px-4" // flex-grow allows footer to be at bottom
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 50, 0.55), rgba(0, 0, 50, 0.75)), url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <Container maxWidth="md" className="text-center z-10">
          <Typography variant="h2" component="h1" className="font-extrabold mb-4 leading-tight tracking-tight"
            sx={{ fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' } }}>
            Transform Your Fitness Journey.
          </Typography>
          <Typography variant="h6" component="p" className="text-fittrack-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
            Track your workouts, monitor progress, schedule sessions, and achieve your health goals with FitTrack Pro – your ultimate gym companion.
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            className="bg-fittrack-blue hover:bg-fittrack-blue-dark text-white normal-case text-base sm:text-lg py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </Button>
        </Container>
      </Box>

      {/* Features Section - Uniform 2x2 Grid */}
      <Box component="section" className="py-16 sm:py-20 bg-fittrack-gray-50">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" className="text-center font-bold text-fittrack-gray-900 mb-3">
            Everything You Need, All In One Place
          </Typography>
          <Typography variant="h6" component="h2" className=" text-center text-fittrack-gray-600 mb-12 max-w-2xl mx-auto">
                        FitTrack Pro offers a comprehensive suite of tools to help members and trainers succeed.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Each Grid item takes 6 columns on md screens and up for a 2-column layout */}
            {/* className="flex" on Grid item helps ensure FeatureCards stretch to equal height within their row */}
            <Grid item xs={12} sm={6} md={6} className="flex">
                <FeatureCard icon={<FitnessCenterIcon />} title="Workout Logging" description="Easily log exercises, sets, reps, and track your personal bests." />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="flex">
                <FeatureCard icon={<AssessmentIcon />} title="Progress Tracking" description="Monitor body metrics, view progress photos, and visualize your gains over time." />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="flex">
                <FeatureCard icon={<EventNoteIcon />} title="Smart Scheduling" description="Book personal training sessions and group classes with ease via an interactive calendar." />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="flex">
                <FeatureCard icon={<RestaurantMenuIcon />} title="Diet & Nutrition" description="Access assigned diet plans and (optionally) track your nutritional intake." />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box component="section" className="py-16 sm:py-20 bg-fittrack-blue text-white">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h4" component="h2" className="font-bold mb-4">
            Ready to Elevate Your Fitness?
          </Typography>
          <Typography variant="h6" component="p" className="text-fittrack-gray-100 mb-8">
            Join FitTrack Pro now and take the first step towards a stronger, healthier you.
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            size="large"
            className="bg-white hover:bg-fittrack-gray-100 text-fittrack-blue hover:text-blue-500 normal-case text-base sm:text-lg py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 "
          >
            Sign Up For Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" className="py-8 bg-fittrack-gray-900 text-fittrack-gray-400 text-center">
        <Container maxWidth="lg">
          <Typography variant="body2">
            © {new Date().getFullYear()} FitTrack Pro. All Rights Reserved.
          </Typography>
          <Typography variant="caption" component="p" className="mt-1">
            <RouterLink to="/privacy" className="hover:text-white mx-2 no-underline">Privacy Policy</RouterLink> |
            <RouterLink to="/terms" className="hover:text-white mx-2 no-underline">Terms of Service</RouterLink>
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;