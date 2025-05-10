// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = ({ role, children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;