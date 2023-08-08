import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouteWrapper = ({ element: Element, ...rest }) => {
  // Implement your authentication and role-based logic here
  const isAuthenticated = true; // Set to true if user is authenticated
  const allowedRoles = rest.allowedRoles || []; // Get allowed roles from route props

  if (isAuthenticated && allowedRoles.includes(rest.userRole)) {
    return <Element />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRouteWrapper;
