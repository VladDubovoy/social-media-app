import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;

  return (
    <Link
      to="/home"
      style={{ textDecoration: 'none' }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="0.5rem"
        sx={{
          '&:hover': {
            '& .logo-text': {
              color: primaryLight,
            },
            '& .logo-icon': {
              color: primaryLight,
            },
          },
        }}
      >
        <Box
          className="logo-icon"
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
        >
          S
        </Box>
        <Typography
          className="logo-text"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{
            transition: 'all 0.3s ease',
          }}
        >
          Social
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo; 