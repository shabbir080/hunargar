import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner
  // debug info to help diagnose auth/role issues
  console.log('AdminRoute:', { user, loading });

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
}
