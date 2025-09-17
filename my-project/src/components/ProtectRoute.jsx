import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loader
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
