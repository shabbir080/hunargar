import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email, password });

            if (userData.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-16">
            
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
            >
                <h1 className="text-center text-3xl font-bold text-white mb-6 tracking-wide">
                    Welcome Back
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 mt-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20"
                    >
                        Login
                    </motion.button>
                </form>

                <p className="text-center text-gray-300 mt-6 text-sm">
                    Need an account? 
                    <span className="text-blue-400 cursor-pointer"> Create one</span>
                </p>
            </motion.div>
        </div>
    );
}
