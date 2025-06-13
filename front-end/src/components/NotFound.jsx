import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={3}
      sx={{
        background: 'linear-gradient(45deg, #1a1a1a 30%, #2d2d2d 90%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', md: '8rem' },
          fontWeight: 700,
          color: '#ffffff',
          mb: 2,
          textShadow: '0 0 20px rgba(255,255,255,0.2)',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: '#ffffff',
          mb: 3,
          fontSize: { xs: '1.5rem', md: '2rem' },
          textShadow: '0 0 10px rgba(255,255,255,0.1)',
        }}
      >
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255,255,255,0.8)',
          mb: 4,
          maxWidth: '600px',
        }}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.9)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
          },
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound; 