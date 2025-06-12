import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, CircularProgress, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import { ProtectedRoute, PublicRoute, RootRoute, ROUTES } from './routes';

// Theme
import { themeSettings } from './theme';

// Lazy loaded components
const HomePage = lazy(() => import('components/HomePage'));
const LoginPage = lazy(() => import('components/LoginPage'));
const ProfilePage = lazy(() => import('components/ProfilePage'));
const NotFoundPage = lazy(() => import('components/NotFoundPage'));

/**
 * Loading component for Suspense fallback
 */
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

/**
 * Error Boundary component to catch and handle errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          p={3}
        >
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page.</p>
        </Box>
      );
    }

    return this.props.children;
  }
}

/**
 * Main application component
 */
function App() {
  // Theme setup
  const mode = useSelector((state) => state.ui.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ErrorBoundary>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Root route */}
                <Route path={ROUTES.ROOT} element={<RootRoute />} />

                {/* Public routes */}
                <Route
                  path={ROUTES.LOGIN}
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />

                {/* Protected routes */}
                <Route
                  path={ROUTES.HOME}
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 route */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
