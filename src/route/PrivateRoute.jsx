import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { CircularProgress } from '@mui/material';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();

    if (loading) {
        return <CircularProgress />;
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
