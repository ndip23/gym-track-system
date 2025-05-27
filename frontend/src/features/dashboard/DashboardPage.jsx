// src/features/dashboard/DashboardPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TapasIcon from '@mui/icons-material/Tapas';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

const dietPlanItems = [
    {
        title: 'Breakfast',
        icon: <BreakfastDiningIcon fontSize="large"/>,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2F0bWVhbCUyMGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60", // Corrected/Verified URL
        details: "Oats & Berries"
    },
    {
        title: 'Lunch',
        icon: <LunchDiningIcon fontSize="large"/>,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60",
        details: "Chicken Salad"
    },
    {
        title: 'Snack',
        icon: <TapasIcon fontSize="large"/>,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25hY2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60",
        details: "Fruits & Nuts"
    },
    {
        title: 'Dinner',
        icon: <DinnerDiningIcon fontSize="large"/>,
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60",
        details: "Salmon & Veggies"
    },
];

const DashboardPage = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="space-y-6 md:space-y-8"> {/* Main container with spacing */}
      <div>
        <Typography variant="h4" className="font-bold text-fittrack-gray-900">
          Dashboard
        </Typography>
        <Typography variant="subtitle1" className="text-fittrack-gray-600">
          Welcome back, {user?.fullName || 'User'}!
        </Typography>
      </div>

      {/* Summary Cards Row - Using Tailwind Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <SummaryCard title="Next Session" value="Today, 6:00 PM" icon={<ScheduleIcon />} color="text-fittrack-blue" />
        <SummaryCard title="This Week" value="3 of 5 Workouts" icon={<FitnessCenterIcon />} color="text-fittrack-success" />
        <SummaryCard title="Membership" value="Due in 2 days" icon={<CreditCardIcon />} color="text-fittrack-warning" />
      </div>

      {/* Today's Diet Plan Section - Refined Card Layout */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <Typography variant="h5" className="font-semibold text-fittrack-gray-900">Today's Diet Plan</Typography>
          <Button component={RouterLink} to="/diet-plan" variant="text" size="small"
            className="text-fittrack-blue hover:bg-fittrack-blue/10 normal-case font-medium">
            View Full
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {dietPlanItems.map((item) => (
            <Paper
              key={item.title}
              className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-white overflow-hidden flex flex-col"
            >
              {/* Top part: Icon and Title */}
              <Box className="p-4 text-center border-b border-fittrack-gray-200">
                <div className="text-fittrack-blue mb-1">{item.icon}</div>
                <Typography variant="h6" className="text-md font-semibold text-fittrack-gray-800">
                  {item.title}
                </Typography>
              </Box>
              {/* Image part */}
              <Box className="h-32 w-full"> {/* Fixed height for image container */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover" // Image covers the container
                />
              </Box>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;