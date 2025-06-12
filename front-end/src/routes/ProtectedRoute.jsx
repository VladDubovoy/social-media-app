import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './constants';

/**
 * Protected Route component to handle authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {JSX.Element} Protected route component
 */
const ProtectedRoute = ({ children }) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return isAuth ? children : <Navigate to={ROUTES.ROOT} />;
};

export default ProtectedRoute; 