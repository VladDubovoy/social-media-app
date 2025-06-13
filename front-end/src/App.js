import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { themeSettings } from './palette/colors';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const mode = useSelector((state) => state.auth.mode);
  const theme = createTheme(themeSettings(mode));

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
              WebkitBoxShadow: mode === 'dark' 
                ? '0 0 0 30px #121212 inset !important'
                : '0 0 0 30px #ffffff inset !important',
              WebkitTextFillColor: mode === 'dark' ? '#ffffff' : '#000000',
              transition: 'background-color 5000s ease-in-out 0s',
            },
          }}
        />
        <Box 
          width="100%" 
          height="100%" 
          minHeight="100vh"
          sx={{
            backgroundColor: mode === 'dark' ? theme.palette.background.default : theme.palette.background.default,
            transition: 'all 0.3s ease',
            WebkitBoxShadow: mode === 'dark' ? 'inset 0 0 100px rgba(0,0,0,0.5)' : 'none',
            boxShadow: mode === 'dark' ? 'inset 0 0 100px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/:userId" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            {/* Catch all route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
