import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">You need administrator privileges to access this page.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-6 py-2 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;