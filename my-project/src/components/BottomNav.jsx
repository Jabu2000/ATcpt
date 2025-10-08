import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext"; // adjust path
import { FaHome, FaMap, FaPlusCircle, FaSearch } from "react-icons/fa";
import { X } from "lucide-react";
import gsap from "gsap";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const avatar =
    user?.profilePicture ||
    (user?.username
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
      : "/icons/profile-placeholder.svg");

  const openSearch = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    gsap.to(searchRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => setShowSearch(false),
    });
  };

  // Animate overlay in
  useEffect(() => {
    if (showSearch) {
      gsap.fromTo(
        searchRef.current,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [showSearch]);

  // Close search with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showSearch) closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "#", icon: <FaSearch />, label: "Search", onClick: openSearch }, // 🔍 open overlay
    { to: "/create-post", icon: <FaPlusCircle />, label: "Post" },
    { to: "/explore", icon: <FaMap />, label: "Explore" },
    {
      to: "/profile",
      icon: (
        <img
          src={avatar}
          alt="profile"
          className="h-6 w-6 md:h-10 md:w-10 rounded-full  object-cover"
        />
      ),
      label: "Profile",
    },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-md 
        flex justify-around items-center py-3 z-50 lg:hidden"
      >
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          // If item has an onClick (like search), use a button instead of Link
          const Wrapper = item.onClick ? "button" : Link;
          const wrapperProps = item.onClick
            ? { onClick: item.onClick }
            : { to: item.to };

          return (
            <Wrapper
              key={item.label}
              {...wrapperProps}
              className="flex flex-col items-center"
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: active ? 1.2 : 1,
                  color: active ? "#FF0000" : "#000000",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl hover:text-[#FF0000]">
                  {item.icon}
                </span>
                <span
                  className={`text-xs mt-1 ${
                    active ? "text-[#FF0000]" : "text-black"
                  } hidden sm:block`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Wrapper>
          );
        })}
      </div>

      {/* 🔍 Search Overlay */}
      {showSearch && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 w-full h-[150px] bg-white/65 backdrop-blur-md z-[110] flex flex-col justify-center items-center p-6"
        >
          <button
            onClick={closeSearch}
            className="absolute top-6 right-6 text-[#FF0000] hover:text-red-400 transition"
          >
            <X size={30} />
          </button>

          <h2 className="text-[#FF0000] text-[20px] md:text-3xl font-bold mb-6">
            Search Adventures
          </h2>

          <div className="w-full max-w-lg flex items-center border-2 border-[#FF0000] rounded-full px-4 py-3 bg-white shadow-lg">
            <FaSearch className="text-[#FF0000] text-lg mr-3" />
            <input
              type="text"
              placeholder="Search restaurants, places, events..."
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
