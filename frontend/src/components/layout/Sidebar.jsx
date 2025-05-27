// src/components/layout/Sidebar.jsx
import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Toolbar } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const navItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { text: 'Workouts', icon: <FitnessCenterIcon />, path: '/workouts' },
  { text: 'Diet Plan', icon: <RestaurantMenuIcon />, path: '/diet-plan' },
  { text: 'Payment', icon: <PaymentIcon />, path: '/payment' },
  { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
];

const Sidebar = ({ drawerWidthClass, mobileOpen, onDrawerToggle }) => {
  const location = useLocation();

  const drawerContent = (
    <div className="h-full flex flex-col bg-white"> {/* Sidebar background */}
      <Toolbar className="flex items-center justify-center h-16 px-4 border-b border-fittrack-gray-200"> {/* Matches AppBar height */}
        <AddCircleOutlineIcon className="text-fittrack-blue-dark text-3xl mr-2" />
        <Typography variant="h5" className="text-fittrack-blue-dark font-bold">
          FitTrack Pro
        </Typography>
      </Toolbar>
      <Box className="p-3 flex-grow overflow-y-auto">
        <Typography variant="overline" className="text-fittrack-gray-600 px-3 block text-xs font-semibold">
          User Dashboard
        </Typography>
        <List component="nav" className="mt-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
            return (
              <ListItemButton
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={isActive}
                onClick={mobileOpen ? onDrawerToggle : undefined} // Close mobile drawer on click
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors duration-150 ease-in-out
                            ${isActive
                                ? 'bg-fittrack-blue text-white shadow-sm'
                                : 'text-fittrack-gray-700 hover:bg-fittrack-gray-100 hover:text-fittrack-blue'
                            }`}
              >
                <ListItemIcon className={`min-w-0 mr-3 ${isActive ? 'text-white' : 'text-fittrack-gray-500'}`}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{className: "text-sm font-medium"}}/>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Temporary, overlays content) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ className: `${drawerWidthClass} bg-white` }} // e.g., w-65
        sx={{ display: { xs: 'block', sm: 'none' } }} // Show only on mobile
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer (Permanent, Fixed Position) */}
      <Drawer
        variant="permanent"
        PaperProps={{
          className: `${drawerWidthClass} bg-white border-r border-fittrack-gray-200`
        }}
        sx={{
          display: { xs: 'none', sm: 'block' }, // Show only on sm and up
          '& .MuiDrawer-paper': {
            position: 'fixed',   // Fixed position
            top: 0,
            left: 0,
            height: '100vh',
            boxSizing: 'border-box',
            // Width is applied via PaperProps className (drawerWidthClass)
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;