import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './constants';

/**
 * Root route handler to redirect based on authentication status
 * @returns {JSX.Element} Redirect component
 */
const RootRoute = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return <Navigate to={isAuth ? ROUTES.HOME : ROUTES.LOGIN} />;
};

export default RootRoute; 