import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LoadingFallback = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '1rem',
        backgroundColor: palette.background.default,
      }}
    >
      <CircularProgress color="primary" />
      <Typography
        variant="h6"
        color={palette.neutral.main}
        sx={{ fontFamily: 'Inter, sans-serif' }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingFallback; 