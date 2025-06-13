import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: 'error.main',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
            }}
          >
            Oops! Something went wrong
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: '600px' }}
          >
            We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '10px 24px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 