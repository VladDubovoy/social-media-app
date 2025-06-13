import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Menu,
  Tooltip,
  Badge,
  Avatar,
  Fade,
  Grow,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
  PersonOutline,
  Home,
  Logout,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout, setSearchQuery } from '../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import Logo from './Logo';
import toast from 'react-hot-toast';

const Navbar = React.memo(() => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const searchQuery = useSelector((state) => state.search.query);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = user ? `${user.firstName} ${user.lastName}` : '';

  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    navigate('/');
    toast.success('See you soon! Logged out successfully!', {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
        padding: '16px',
      },
      icon: '👋',
    });
  }, [dispatch, navigate]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuToggled((prev) => !prev);
  }, []);

  const handleModeToggle = useCallback(() => {
    dispatch(setMode());
    toast.success(`Switched to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`, {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
        padding: '16px',
      },
      icon: theme.palette.mode === 'dark' ? '☀️' : '🌙',
    });
  }, [dispatch, theme.palette.mode]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  if (!user) {
    return null;
  }

  return (
    <Fade in timeout={800}>
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          backgroundColor: `${alt}dd`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <FlexBetween
          padding="1rem 6%"
          sx={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <FlexBetween gap="1.75rem">
            <Logo />
            {isNonMobileScreens && (
              <Grow in timeout={500}>
                <FlexBetween
                  backgroundColor={theme.palette.mode === 'dark' ? theme.palette.background.paper : neutralLight}
                  borderRadius="20px"
                  gap="3rem"
                  padding="0.5rem 1.5rem"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : neutralLight,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <InputBase 
                    placeholder="Search posts..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : dark,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : neutralLight,
                        '&::placeholder': {
                          color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : dark,
                          opacity: 0.7,
                        },
                      },
                    }}
                  />
                  <IconButton
                    sx={{
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Search sx={{ color: theme.palette.mode === 'dark' ? theme.palette.text.primary : dark }} />
                  </IconButton>
                </FlexBetween>
              </Grow>
            )}
          </FlexBetween>

          {/* DESKTOP NAV */}
          {isNonMobileScreens ? (
            <FlexBetween gap="1.5rem">
              <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton 
                  onClick={handleModeToggle}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(30deg)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {theme.palette.mode === 'dark' ? (
                    <DarkMode sx={{ fontSize: '25px' }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: '25px' }} />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title="Messages">
                <IconButton
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Message sx={{ fontSize: '25px' }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Badge badgeContent={5} color="error">
                    <Notifications sx={{ fontSize: '25px' }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Help">
                <IconButton
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Help sx={{ fontSize: '25px' }} />
                </IconButton>
              </Tooltip>

              <FormControl
                variant="standard"
                value={fullName}
                sx={{
                  minWidth: '200px',
                }}
              >
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    borderRadius: '20px',
                    p: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                    '& .MuiSvgIcon-root': {
                      pr: '0.25rem',
                      width: '3rem',
                    },
                    '& .MuiSelect-select:focus': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Box display="flex" alignItems="center" gap="1rem">
                      <Avatar
                        src={user.picturePath}
                        alt={fullName}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography>{fullName}</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Box display="flex" alignItems="center" gap="1rem">
                      <Logout sx={{ fontSize: '20px' }} />
                      <Typography>Log Out</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          ) : (
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
              }}
            >
              <Menu />
            </IconButton>
          )}

          {/* MOBILE NAV */}
          {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="200px"
              backgroundColor={background}
              sx={{
                animation: 'slideIn 0.3s ease-out',
                '@keyframes slideIn': {
                  from: {
                    transform: 'translateX(100%)',
                  },
                  to: {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="flex-end"
                p="1rem"
              >
                <IconButton
                  onClick={handleMobileMenuToggle}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(90deg)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Close />
                </IconButton>
              </Box>

              <FlexBetween
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
                p="2rem"
              >
                <IconButton
                  onClick={handleModeToggle}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(30deg)',
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {theme.palette.mode === 'dark' ? (
                    <DarkMode sx={{ fontSize: '25px' }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: '25px' }} />
                  )}
                </IconButton>

                <Tooltip title="Messages">
                  <IconButton
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Badge badgeContent={3} color="error">
                      <Message sx={{ fontSize: '25px' }} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                  <IconButton
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Badge badgeContent={5} color="error">
                      <Notifications sx={{ fontSize: '25px' }} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Help">
                  <IconButton
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Help sx={{ fontSize: '25px' }} />
                  </IconButton>
                </Tooltip>

                <FormControl
                  variant="standard"
                  value={fullName}
                  sx={{
                    width: '100%',
                  }}
                >
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      borderRadius: '20px',
                      p: '0.5rem 1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                      '& .MuiSvgIcon-root': {
                        pr: '0.25rem',
                        width: '3rem',
                      },
                      '& .MuiSelect-select:focus': {
                        backgroundColor: 'transparent',
                      },
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Avatar
                          src={user.picturePath}
                          alt={fullName}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography>{fullName}</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Logout sx={{ fontSize: '20px' }} />
                        <Typography>Log Out</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </FlexBetween>
            </Box>
          )}

          {/* MOBILE MENU */}
          <IconButton 
            onClick={handleClick}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              },
            }}
          >
            <PersonOutline sx={{ fontSize: '25px' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  gap: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>
              <Avatar
                src={user.picturePath}
                alt={fullName}
                sx={{ width: 24, height: 24 }}
              />
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/home')}>
              <Home sx={{ fontSize: '20px' }} />
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ fontSize: '20px' }} />
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </FlexBetween>
      </Box>
    </Fade>
  );
});

export default Navbar;
