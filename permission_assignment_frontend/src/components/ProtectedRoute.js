// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? <Component {...rest} isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;