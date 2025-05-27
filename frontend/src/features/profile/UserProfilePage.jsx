// src/features/profile/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Paper, Avatar, Box, Button, Divider, TextField, Grid,
  CircularProgress, Alert as MuiAlert, Tabs, Tab, IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // For Body Metrics
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // For Progress Photos

// Placeholder: Import actions for updating profile/password if you were to implement them
// import { updateUserProfile, changePassword } from './profileSlice'; // Or from authSlice

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading: authLoading, error: authError } = useSelector(state => state.auth);

  const [activeTab, setActiveTab] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '', // Email is typically not user-editable directly
    phone: '',
    // Add other editable fields like address, emergencyContact, etc.
  });

  // For password change modal (to be implemented later)
  // const [openPasswordModal, setOpenPasswordModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || 'N/A', // Assuming user object might have phone
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Saving profile (simulated):", profileData);
    // dispatch(updateUserProfile({ userId: user.id, ...profileData })); // Example action
    alert("Profile update functionality to be implemented.");
    setIsEditingProfile(false);
  };

  if (authLoading && !user) {
    return (
      <Paper className="p-6 rounded-xl shadow-lg text-center min-h-[400px] flex justify-center items-center bg-white">
        <CircularProgress />
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper className="p-6 rounded-xl shadow-lg text-center bg-white">
        <Typography>User not found. Please try logging in again.</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="p-4 sm:p-6 md:p-8 rounded-xl shadow-xl max-w-5xl mx-auto bg-white">
      <Typography variant="h4" component="h1" className="font-bold text-fittrack-gray-900 mb-6 text-center sm:text-left">
        My Profile
      </Typography>

      {authError && <MuiAlert severity="error" className="mb-4">{authError}</MuiAlert>}

      {/* Main Profile Header */}
      <Grid container spacing={3} className="mb-6 items-center">
        <Grid item xs={12} sm="auto" className="flex flex-col items-center">
          <div className="relative">
            <Avatar
              alt={user.fullName}
              src={user.avatarUrl}
              className="w-28 h-28 sm:w-36 sm:h-36 text-5xl border-4 border-fittrack-blue shadow-md"
            >
              {!user.avatarUrl && user.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <IconButton
                size="small"
                onClick={() => alert("Change photo TBD")}
                className="absolute bottom-1 right-1 bg-white/80 hover:bg-white p-1 shadow-md"
            >
                <PhotoCameraIcon fontSize="small" className="text-fittrack-blue"/>
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant="h5" className="font-semibold text-fittrack-gray-800">{user.fullName}</Typography>
          <Typography variant="body1" className="text-fittrack-gray-600">{user.email}</Typography>
          <Typography variant="body2" className="text-fittrack-blue font-medium mt-1 capitalize">{user.role}</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon fontSize="small"/>}
            className="mt-3 normal-case text-fittrack-blue border-fittrack-blue hover:bg-fittrack-blue/10"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            {isEditingProfile ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Grid>
      </Grid>

      {/* Edit Profile Form (Conditional) */}
      {isEditingProfile && (
        <Box component="form" onSubmit={handleSaveProfile} className="mb-6 p-4 border border-fittrack-gray-200 rounded-lg bg-fittrack-gray-50 space-y-4">
            <Typography variant="h6" className="font-medium text-fittrack-gray-700">Edit Your Information</Typography>
            <TextField label="Full Name" name="fullName" value={profileData.fullName} onChange={handleProfileInputChange} fullWidth variant="outlined" size="small"/>
            <TextField label="Phone Number" name="phone" value={profileData.phone} onChange={handleProfileInputChange} fullWidth variant="outlined" size="small"/>
            {/* Add other editable fields here */}
            <Box className="flex justify-end space-x-2">
                <Button onClick={() => setIsEditingProfile(false)} className="normal-case text-fittrack-gray-600">Cancel</Button>
                <Button type="submit" variant="contained" className="bg-fittrack-blue hover:bg-fittrack-blue-dark normal-case">Save Changes</Button>
            </Box>
        </Box>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="profile sections tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Account Details" icon={<AccountCircleIcon />} iconPosition="start" className="normal-case" />
          <Tab label="Body Metrics" icon={<FitnessCenterIcon />} iconPosition="start" className="normal-case" />
          <Tab label="Progress Photos" icon={<CameraAltIcon />} iconPosition="start" className="normal-case" />
          <Tab label="Security" icon={<VpnKeyIcon />} iconPosition="start" className="normal-case" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Typography variant="h6" className="font-semibold text-fittrack-gray-800 mb-3">Membership Information</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField label="Membership Tier" defaultValue={user.membershipType || "Standard Monthly"} fullWidth variant="filled" InputProps={{ readOnly: true }} size="small"/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Join Date" defaultValue={user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"} fullWidth variant="filled" InputProps={{ readOnly: true }} size="small"/>
            </Grid>
             <Grid item xs={12} sm={6}>
                <TextField label="Membership Expiry" defaultValue={user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : "N/A"} fullWidth variant="filled" InputProps={{ readOnly: true }} size="small"/>
            </Grid>
        </Grid>
        {/* Add more read-only details here if needed */}
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h6" className="font-semibold text-fittrack-gray-800 mb-3">Track Your Body Metrics</Typography>
        <Paper variant="outlined" className="p-6 text-center border-dashed border-fittrack-gray-300">
          <FitnessCenterIcon className="text-4xl text-fittrack-gray-400 mb-2"/>
          <Typography className="text-fittrack-gray-600">Body metrics tracking (weight, BMI, body fat %) will be displayed here.</Typography>
          <Typography className="text-fittrack-gray-500 text-sm">Graphs and history will also be available.</Typography>
          <Button variant="contained" className="mt-4 bg-fittrack-blue hover:bg-fittrack-blue-dark normal-case" onClick={() => alert("Add/Edit Metrics TBD")}>Log Metrics</Button>
        </Paper>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h6" className="font-semibold text-fittrack-gray-800 mb-3">Your Progress Photos</Typography>
        <Paper variant="outlined" className="p-6 text-center border-dashed border-fittrack-gray-300">
            <CameraAltIcon className="text-4xl text-fittrack-gray-400 mb-2"/>
          <Typography className="text-fittrack-gray-600">View your progress photo timeline.</Typography>
          <Button variant="contained" className="mt-4 bg-fittrack-blue hover:bg-fittrack-blue-dark normal-case" onClick={() => alert("Upload Photo TBD")}>Upload New Photo</Button>
        </Paper>
        {/* Grid of photos will go here */}
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h6" className="font-semibold text-fittrack-gray-800 mb-3">Security Settings</Typography>
        <Button variant="outlined" startIcon={<VpnKeyIcon />} className="normal-case text-fittrack-gray-700 border-fittrack-gray-400 hover:bg-fittrack-gray-100" onClick={() => alert("Open Change Password Modal TBD")}>
            Change Password
        </Button>
        {/* Add options like Two-Factor Authentication setup here */}
      </TabPanel>
    </Paper>
  );
};

export default UserProfilePage;