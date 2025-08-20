
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OwnerProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.role !== 'Owner') {
        // Redirect non-owners to the main admin dashboard
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};

export default OwnerProtectedRoute;