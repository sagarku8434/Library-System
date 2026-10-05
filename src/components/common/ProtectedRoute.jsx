import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If student tries to visit /admin, send them to student dashboard
    if (user.role === 'student' && requiredRole === 'admin') {
      return <Navigate to="/student/dashboard" replace />;
    }
    // If admin visits student, allow or redirect as appropriate
  }

  return children;
}
