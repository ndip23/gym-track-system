// src/features/workouts/WorkoutPage.jsx
import React, { useState } from 'react';
import { Typography, Paper, Button, Grid, Box, Divider, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Main icon
import EventNoteIcon from '@mui/icons-material/EventNote'; // For assigned plans
import HistoryIcon from '@mui/icons-material/History'; // For recent logs
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

// Mock Data - Replace with Redux state and API calls later
const mockRecentLogs = [
  { id: 'log1', date: '2023-10-25', type: 'Full Body Strength', duration: '60 min', summary: 'Bench, Squats, Deadlifts' },
  { id: 'log2', date: '2023-10-23', type: 'Cardio Blast', duration: '45 min', summary: 'Treadmill, Cycling' },
  { id: 'log3', date: '2023-10-21', type: 'Upper Body Focus', duration: '55 min', summary: 'Rows, Pull-ups, Presses' },
];

const mockAssignedPlans = [
  { id: 'plan1', name: 'Beginner Full Body (3x Week)', trainer: 'Jane Fitwell', startDate: '2023-10-20', status: 'Active' },
  { id: 'plan2', name: 'Marathon Prep - Phase 1', trainer: 'Coach Dave', startDate: '2023-09-01', status: 'Completed' },
];

const WorkoutPage = () => {
  // const [showLogForm, setShowLogForm] = useState(false); // For modal form later

  const handleLogNewWorkout = () => {
    // setShowLogForm(true); // Open modal
    alert("Open 'Log New Workout' form/modal - TBD");
    // Later, this could navigate or open a modal: navigate('/workouts/new');
  };

  return (
    <div className="space-y-6"> {/* Main container with spacing */}
      <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <Typography variant="h4" component="h1" className="font-bold text-fittrack-gray-900 mb-3 sm:mb-0">
            My Workouts
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleLogNewWorkout}
            className="bg-fittrack-blue hover:bg-fittrack-blue-dark text-white normal-case self-start sm:self-center"
          >
            Log New Workout
          </Button>
        </div>
        <Typography className="text-fittrack-gray-700 mb-6">
          Track your exercises, view your assigned routines, and monitor your strength progression here.
        </Typography>
      </Paper>

      {/* Recent Workout Logs Section */}
      <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white">
        <div className="flex items-center mb-4">
          <HistoryIcon className="text-2xl text-fittrack-blue mr-2" />
          <Typography variant="h5" className="font-semibold text-fittrack-gray-800">
            Recent Workout Logs
          </Typography>
        </div>
        {mockRecentLogs.length > 0 ? (
          <List disablePadding>
            {mockRecentLogs.map((log, index) => (
              <React.Fragment key={log.id}>
                <ListItem
                  className="py-3 hover:bg-fittrack-gray-50 rounded-lg transition-colors"
                  secondaryAction={
                    <Button size="small" variant="outlined" className="normal-case text-fittrack-blue border-fittrack-blue hover:bg-fittrack-blue/10" onClick={() => alert(`View details for log: ${log.id}`)}>
                      View
                    </Button>
                  }
                >
                  <ListItemIcon className="min-w-0 mr-3">
                    <FitnessCenterIcon className="text-fittrack-gray-500" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<span className="font-medium text-fittrack-gray-800">{log.type} - {log.duration}</span>}
                    secondary={`${new Date(log.date).toLocaleDateString()} - ${log.summary}`}
                  />
                </ListItem>
                {index < mockRecentLogs.length - 1 && <Divider component="li" className="my-1" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box className="text-center py-6">
            <FitnessCenterIcon className="text-5xl text-fittrack-gray-300 mb-2" />
            <Typography className="text-fittrack-gray-500">No workouts logged recently.</Typography>
          </Box>
        )}
      </Paper>

      {/* Assigned Workout Plans Section */}
      <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white">
        <div className="flex items-center mb-4">
          <EventNoteIcon className="text-2xl text-fittrack-blue mr-2" />
          <Typography variant="h5" className="font-semibold text-fittrack-gray-800">
            Assigned Workout Plans
          </Typography>
        </div>
        {mockAssignedPlans.length > 0 ? (
          <div className="space-y-3">
            {mockAssignedPlans.map((plan) => (
              <Paper key={plan.id} variant="outlined" className="p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-fittrack-gray-50/50 hover:shadow-md transition-shadow">
                <Box>
                  <Typography className="font-semibold text-fittrack-blue">{plan.name}</Typography>
                  <Typography variant="body2" className="text-fittrack-gray-600">
                    Assigned by: {plan.trainer} | Started: {new Date(plan.startDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Chip
                        label={plan.status}
                        size="small"
                        color={plan.status === 'Active' ? 'success' : 'default'}
                        className={plan.status === 'Active' ? 'bg-fittrack-success/20 text-fittrack-success font-medium' : 'bg-fittrack-gray-200 text-fittrack-gray-700 font-medium'}
                    />
                    <Button size="small" variant="contained" className="bg-fittrack-blue hover:bg-fittrack-blue-dark text-white normal-case" onClick={() => alert(`View plan: ${plan.name}`)}>
                        View Plan
                    </Button>
                </Box>
              </Paper>
            ))}
          </div>
        ) : (
          <Box className="text-center py-6">
            <EventNoteIcon className="text-5xl text-fittrack-gray-300 mb-2" />
            <Typography className="text-fittrack-gray-500">No workout plans assigned to you.</Typography>
          </Box>
        )}
      </Paper>

      {/* Placeholder for Workout Log Form Modal - to be implemented later */}
      {/* <AppModal open={showLogForm} onClose={() => setShowLogForm(false)} title="Log New Workout">
        <Typography>Workout logging form will go here...</Typography>
      </AppModal> */}
    </div>
  );
};

export default WorkoutPage;