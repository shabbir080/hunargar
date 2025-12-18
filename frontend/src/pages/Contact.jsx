import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Twitter,
  
  Linkedin,
  CheckCircle,
  XCircle,
} from "lucide-react";

import Footer from "../components/Footer";
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simulate a successful send on the client without calling backend
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 800);
  };

  return (
  
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white px-6 py-20">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-24"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Have questions, feedback, or business inquiries? Our team is always ready to connect with you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Reach Us</h2>

            <div className="space-y-6 text-lg">
              <div className="flex items-center gap-4">
                <Mail className="text-indigo-400" />
                <span>shabbirhussaindev80@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-pink-400" />
                <span>+92 340 8004867</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-pink-300" />
                <span>+92 355 4956627</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-emerald-400" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* SOCIALS */}
         {/* SOCIALS */}
<div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-xl">
  <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
  <div className="flex gap-6">
    <motion.a
      href="https://www.facebook.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="p-4 rounded-full bg-white/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition"
    >
      <Facebook />
    </motion.a>

    <motion.a
      href="https://www.instagram.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="p-4 rounded-full bg-white/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition"
    >
      <Instagram />
    </motion.a>

    <motion.a
      href="https://twitter.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="p-4 rounded-full bg-white/20 hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-600 transition"
    >
      <Twitter />
    </motion.a>

    <motion.a
      href="https://www.linkedin.com/in/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="p-4 rounded-full bg-white/20 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition"
    >
      <Linkedin />
    </motion.a>
  </div>
</div>

        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-xl bg-white/20 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full rounded-xl bg-white/20 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded-xl bg-white/20 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Write your message..."
            className="w-full rounded-xl bg-white/20 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />

          {status === "success" && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle /> Message sent successfully
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400">
              <XCircle /> Failed to send message
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-4 rounded-xl font-semibold shadow-lg"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send msg"}
          </motion.button>
        </motion.form>
      </div>

     

    </div>
      <Footer />
    
    </>

  );
}
