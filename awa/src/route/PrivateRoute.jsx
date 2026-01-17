import { Navigate } from 'react-router-dom';
import React from 'react';
import { getToken } from '../services/auth';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
