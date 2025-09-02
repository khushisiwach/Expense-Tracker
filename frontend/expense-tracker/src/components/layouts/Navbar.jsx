import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react"; // icons
import { Link } from "react-router-dom";

export default function AdvancedNavbar() {
  const { user, clearUser } = useContext(UserContext);
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", link: "dashboard", icon: LayoutDashboard },
    { name: "Income", link: "/income", icon: TrendingUp },
    { name: "Expense", link: "/expense", icon: TrendingDown },
  ];
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    clearUser();
    window.location.href = "/login";
  };

  return (
    <nav
      className="backdrop-blur-md bg-[#f4f0fa]/70 px-8 py-3 flex justify-between items-center 
                 rounded-b-2xl shadow-[8px_8px_16px_#c8c2d8,-8px_-8px_16px_#ffffff]
                 fixed w-full z-50 border-b border-purple-200/40"
    >
      {/* 🌟 Logo Section */}
      <Link to='/' whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center 
                        bg-gradient-to-tr from-purple-400 via-purple-200 to-white
                        shadow-[inset_4px_4px_8px_#c8c2d8,inset_-4px_-4px_8px_#ffffff]"
        >
          <Wallet className="text-purple-500 w-6 h-6" />
        </div>
        <span className="text-black-700 text-md tracking-wide drop-shadow-sm">
          Expense Tracker
        </span>
      </Link>

      {/* 🌟 Nav Links */}
      <div className="flex items-center space-x-4">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.link}
            whileHover={{ scale: 1.08 }}
            className={`relative px-5 py-2 rounded-xl font-medium text-sm flex items-center gap-2
              transition-all duration-300
              ${
                hovered === idx
                  ? "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 shadow-[inset_4px_4px_8px_#c8c2d8,inset_-4px_-4px_8px_#ffffff]"
                  : "text-black hover:bg-purple-100/70 hover:text-purple-600 hover:shadow-[4px_4px_8px_#c8c2d8,-4px_-4px_8px_#ffffff]"
              }`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onClick={()=>{
            if(!user){
              navigate("/login");
            } else{
              navigate(link.link);
            }
                }}
               style={{cursor: "pointer"}}
          >
            <link.icon className="w-4 h-4 text-purple-600" />
            {link.name}
          </Link>
        ))}

        {/* 🌟 Profile / Auth */}
        {user ? (
          <div className="relative">
            {/* Avatar Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center
                         shadow-[4px_4px_8px_#c8c2d8,-4px_-4px_8px_#ffffff]"
            >
              <User className="text-purple-700" />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-40 rounded-xl bg-[#f4f0fa] 
                             shadow-[6px_6px_12px_#c8c2d8,-6px_-6px_12px_#ffffff] p-3"
                >
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-black
                               hover:bg-purple-100 transition-all"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 
                               hover:bg-red-100 transition-all mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="px-5 py-2 rounded-xl text-purple-700 font-medium text-sm
                         bg-gradient-to-tr from-purple-100 to-purple-50
                         shadow-[4px_4px_8px_#c8c2d8,-4px_-4px_8px_#ffffff]
                         transition-all duration-300"
            >
              Login
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/signup"
              className="px-5 py-2 rounded-xl text-purple-700 font-medium text-sm
                         bg-gradient-to-tr from-purple-100 to-purple-50
                         shadow-[4px_4px_8px_#c8c2d8,-4px_-4px_8px_#ffffff]
                         transition-all duration-300"
            >
              Signup
            </motion.a>
          </>
        )}
      </div>
    </nav>
  );
}
