import { Navigate } from 'react-router-dom';
import React from 'react';
import { getToken } from '../services/auth';

const PublicRoute = ({ children }) => {
  const token = getToken();
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
