import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaMap, FaBookmark, FaUserFriends, FaPlusCircle } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/explore", icon: <FaMap />, label: "Explore" },
    { to: "/adventures", icon: <FaBookmark />, label: "Saved" },
    { to: "/find", icon: <FaUserFriends />, label: "People" },
    { to: "/create-post", icon: <FaPlusCircle />, label: "Post" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 
      flex justify-around items-center py-2 z-50 lg:hidden">
      {navItems.map((item) => {
        const active = location.pathname === item.to;

        return (
          <Link key={item.to} to={item.to} className="flex flex-col items-center">
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={{ scale: active ? 1.2 : 1, color: active ? "#AEFF53" : "#9ca3af" }}
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