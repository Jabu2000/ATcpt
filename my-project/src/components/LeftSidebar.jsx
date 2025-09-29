import React from "react";
import {
  FaHome,
  FaMap,
  FaBookmark,
  FaUserFriends,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // adjust path

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const avatar =
    user?.profilePicture ||
    (user?.username
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
      : "/icons/profile-placeholder.svg");

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-[#ffffff] border-r border-[#AEFF53] flex flex-col justify-between  py-6 
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
          <Link to="/" className="flex items-center gap-3">
            <FaHome className="text-xl" />
            <h3 className="hidden md:block text-base font-bold text-[20px]">
              Home
            </h3>
          </Link>
          <Link to="/explore" className="flex items-center gap-3">
            <FaSearch className="text-xl" />
            <h3 className="hidden md:block text-base font-bold text-[20px]">
              Search
            </h3>
          </Link>
          <Link to="/explore" className="flex items-center gap-3">
            <FaMap className="text-xl" />
            <h3 className="hidden md:block text-base font-bold text-[20px]">
              Explore
            </h3>
          </Link>
          <Link to="/profile" className="flex items-center gap-3">
            <FaBookmark className="text-xl" />
            <h3 className="hidden md:block text-base font-bold text-[20px]">
              Saved
            </h3>
          </Link>
          <Link to="/adventures" className="flex items-center gap-3">
            <FaUserFriends className="text-xl" />
            <h3 className="hidden md:block text-base font-bold text-[20px]">
              People
            </h3>
          </Link>
          <Link to="/create-post" className="flex items-center gap-3">
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
          className="w-full md:w-auto text-xs md:text-sm font-semibold bg-[#AEFF53] hover:bg-[#9ae745] 
          text-black hover:text-white rounded-full py-2 px-6 md:px-10 transition"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
