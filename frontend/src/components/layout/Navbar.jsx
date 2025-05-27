// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Badge, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { logoutSuccess } from '../../features/auth/authSlice';

const Navbar = ({ onDrawerToggle, drawerWidthClass }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/'); // <<< CHANGE: Navigate to the landing page (root path)
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      className={`bg-white text-fittrack-gray-800 shadow-sm border-b border-fittrack-gray-200 ${drawerWidthClass}`}
    >
      <Toolbar className="px-4 sm:px-6 min-h-[64px]">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          className="mr-2 sm:hidden text-fittrack-gray-600 hover:bg-fittrack-gray-100"
        >
          <MenuIcon />
        </IconButton>

        <Box className="flex-grow" /> {/* Pushes items to the right */}

        <Box className="flex items-center space-x-2 sm:space-x-4">
          <Tooltip title="Notifications">
            <IconButton color="inherit" className="text-fittrack-gray-600 hover:bg-fittrack-gray-100">
              <Badge badgeContent={3} color="error"> {/* Mock badge */}
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {user && (
            <>
              <Tooltip title={user.fullName || "Account"}>
                <IconButton onClick={handleOpenUserMenu} className="p-0">
                  <Avatar alt={user.fullName} src={user.avatarUrl} className="w-8 h-8 sm:w-9 sm:h-9" />
                </IconButton>
              </Tooltip>
              <Typography className="ml-2 hidden md:block text-sm font-medium text-fittrack-gray-800">
                {user.fullName}
              </Typography>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                className="mt-2"
                PaperProps={{ className: 'bg-white shadow-xl rounded-md w-48' }}
              >
                <MenuItem 
                  onClick={() => { navigate('/profile'); handleCloseUserMenu(); }} 
                  className="text-sm text-fittrack-gray-700 px-4 py-2 hover:bg-fittrack-gray-100"
                >
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout} 
                  className="text-sm text-fittrack-gray-700 px-4 py-2 hover:bg-fittrack-gray-100"
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;