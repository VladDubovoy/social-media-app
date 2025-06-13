import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  if (isAuth) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute; 