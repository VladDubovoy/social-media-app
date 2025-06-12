import React, { useCallback } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = React.memo(() => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const navigate = useNavigate();
  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          sx={{
            mb: '1rem',
          }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            mb: '2rem',
          }}
        >
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </Typography>
        <Box>
          <Typography
            variant="body1"
            color="primary"
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={handleGoHome}
          >
            Go back to Home
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default NotFoundPage;
