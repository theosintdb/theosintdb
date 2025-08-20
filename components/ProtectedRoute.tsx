
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!roles.includes(user.role)) {
        // If user does not have the required role, redirect them to a default page
        // For example, an Admin trying to access an Owner-only page
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;