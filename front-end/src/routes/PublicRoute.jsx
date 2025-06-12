import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './constants';

/**
 * Public Route component to handle non-authenticated routes
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if not authenticated
 * @returns {JSX.Element} Public route component
 */
const PublicRoute = ({ children }) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? <Navigate to={ROUTES.HOME} /> : children;
};

export default PublicRoute; 