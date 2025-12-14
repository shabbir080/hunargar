import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = await signup({ name, email, password, role });

            if (role === "admin") navigate("/admin");
            else navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center pt-30 justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-16">
            
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
            >
                <h1 className="text-center text-3xl font-bold text-white mb-6 tracking-wide">
                    Create Account
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-gray-200 mb-1 block font-medium">Select Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                        >
                            <option value="customer" className="text-black">User</option>
                            <option value="admin" className="text-black">Admin</option>
                        </select>
                    </div>
                    <Link to= "/login">
                    <motion.button
                       
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-xl font-semibold shadow-lg shadow-green-600/20"
                    >
                        Create Account
                    </motion.button>
                    </Link>
                </form>

                <p className="text-center text-gray-300 mt-6 text-sm">
                    Already have an account?
                    <span className="text-green-400 cursor-pointer"> Login here</span>
                </p>
            </motion.div>
        </div>
    );
}
