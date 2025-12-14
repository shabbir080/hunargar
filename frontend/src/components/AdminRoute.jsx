import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
}
