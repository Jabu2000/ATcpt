import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext"; // adjust path
import {
  FaHome,
  FaMap,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const avatar =
    user?.profilePicture ||
    (user?.username
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
      : "/icons/profile-placeholder.svg");

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/search", icon: <FaSearch />, label: "Saved" },
    { to: "/create-post", icon: <FaPlusCircle />, label: "Post" },
    { to: "/explore", icon: <FaMap />, label: "Explore" },
    
    {
      to: "/profile",
      icon: (
        <img
          src={avatar}
          alt="profile"
          className="h-6 w-6 md:h-10 md:w-10 rounded-full object-cover"
        />
      ),
      label: "Profile",
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 
      flex justify-around items-center py-2 z-50 lg:hidden"
    >
      {navItems.map((item) => {
        const active = location.pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center"
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: active ? 1.2 : 1,
                color: active ? "#AEFF53" : "#9ca3af",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`text-xs mt-1 ${
                  active ? "text-[#AEFF53]" : "text-gray-400"
                } hidden sm:block`}
              >
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
