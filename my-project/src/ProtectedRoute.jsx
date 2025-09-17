import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null; // or a loader
  return user ? children : <Navigate to="/login" replace />;
}