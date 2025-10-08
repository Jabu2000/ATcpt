import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaMap,
  FaBookmark,
  FaUserFriends,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // adjust path
import { X } from "lucide-react";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false); // 🔍 new state

  // 🔍 Handle search open/close
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

  // 🔍 Animate search overlay in
  useEffect(() => {
    if (showSearch) {
      gsap.fromTo(
        searchRef.current,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [showSearch]);

  // ESC key closes search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showSearch) closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  const avatar =
    user?.profilePicture ||
    (user?.username
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
      : "/icons/profile-placeholder.svg");

  return (
    <>
      <div
        className="fixed left-0 top-0 h-screen bg-[#ffffff] border-r border-green-500 flex flex-col justify-between  py-6 
      w-20 sm:w-28 md:w-40 lg:w-56 xl:w-[20%] 2xl:w-[16%] z-10"
      >
        {/* Top Section */}
        <div className="flex flex-col items-center md:items-start pl-8 gap-6">
          {/* Logo */}
          <Link to="/">
            <img
              src="/paperplan.png"
              alt="logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex gap-3 items-center">
            <img
              src={avatar}
              alt="profile"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col">
              <h4 className="text-base md:text-lg font-semibold text-black">
                {user?.username || "Guest"}
              </h4>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex flex-col gap-8 text-black mt-4 ">
            <Link
              to="/"
              className="flex items-center gap-3 text-black hover:text-[#FF0000] "
            >
              <FaHome className="text-xl" />
              <h3 className="hidden md:block text-base font-bold text-[20px]">
                Home
              </h3>
            </Link>
            <button
              onClick={openSearch} // 🔍 opens overlay
              aria-label="search adventures"
              className="flex items-center gap-3 text-black hover:text-[#FF0000]"
            >
              <FaSearch className="text-xl" />
              <h3 className="hidden md:block text-base font-bold text-[20px]">
                Search
              </h3>
            </button>
            <Link
              to="/explore"
              className="flex items-center gap-3 text-black hover:text-[#FF0000]"
            >
              <FaMap className="text-xl" />
              <h3 className="hidden md:block text-base font-bold text-[20px]">
                Explore
              </h3>
            </Link>
            <Link
              to="/create-post"
              className="flex items-center gap-3 text-black hover:text-[#FF0000]"
            >
              <FaPlusCircle className="text-xl" />
              <h3 className="hidden md:block text-base font-bold text-[20px]">
                Create
              </h3>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex justify-center items-center ">
          <button
            className="w-full md:w-auto text-xs md:text-sm font-semibold bg-[#FF0000] hover:bg-red-400 
          text-white rounded-2xl py-2 px-6 md:px-10 transition"
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
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

export default LeftSidebar;
