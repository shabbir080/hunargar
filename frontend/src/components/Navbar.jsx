import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", path: "/products" },
    { name: "About us", path: "/about" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 z-50
        max-w-6xl w-full 
        px-6 md:px-12 lg:px-16 
        transition-all duration-500
        rounded-full 
        ${scrolled ? "bg-white/80 shadow-md backdrop-blur-lg py-3" : "bg-white/50 py-4"}
      `}
    >
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-gray-900">
            HunarGar
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`
                group flex flex-col gap-0.5 transition-all 
                ${scrolled ? "text-gray-900" : "text-gray-900"}
              `}
            >
              {item.name}
              <div
                className={`
                  h-0.5 w-0 group-hover:w-full transition-all duration-300 
                  ${scrolled ? "bg-gray-900" : "bg-gray-900"}
                `}
              />
            </Link>
          ))}

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="group flex flex-col gap-0.5 text-gray-900"
            >
              Admin
              <div className="h-0.5 w-0 group-hover:w-full bg-gray-900 transition-all duration-300" />
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">{user.name || user.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(true)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <nav
        className={`
          md:hidden fixed top-0 left-0 h-full 
          bg-white/80 backdrop-blur-xl 
          flex flex-col items-center justify-center
          gap-6 text-gray-900 text-lg font-medium
          transition-all duration-500
          ${open ? "w-full" : "w-0 overflow-hidden"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5"
          onClick={() => setOpen(false)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Navigation Links */}
        {navLinks.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            onClick={() => setOpen(false)}
            className="hover:text-indigo-600 transition"
          >
            {item.name}
          </Link>
        ))}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="hover:text-indigo-600"
          >
            Admin
          </Link>
        )}

        {/* Auth Mobile */}
        {user ? (
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="px-5 py-2 bg-red-500 text-white rounded-full"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-5 py-2 border border-gray-300 rounded-full"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-full"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
