import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Try to fetch profile from backend. Add /auth/profile on backend if not present.
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile"); // backend: implement if missing
      setUser(res.data.user || null);
      setAuthError(null);
    } catch (err) {
      console.error("fetchProfile error:", err.response?.data || err.message);
      setAuthError(err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (emailOrPayload, password) => {
    const payload = typeof emailOrPayload === "object" ? emailOrPayload : { email: emailOrPayload, password };
    const res = await api.post("/auth/login", payload);
    setUser(res.data);
    return res.data;
  };

  const signup = async (payload) => {
    const res = await api.post("/auth/signup", payload);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, fetchProfile, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
}
