import React from "react";
import { FaHome, FaMap, FaBookmark, FaUserFriends, FaPlusCircle } from "react-icons/fa";
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
    <div className="fixed w-[16%] h-[100vh] bg-[#E8FFE6] flex flex-col py-10 justify-between items-center">
      {/* Top Section */}
      <div className="flex flex-col justify-center items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/paperplan.png" alt="logo" className="h-12 w-12" />
        </Link>

        {/* Profile */}
        <Link to="/profile" className="flex gap-3 items-center mt-[20px]">
          <img
            src={avatar}
            alt="profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h4 className="text-[20px] font-semibold text-black">{user?.username || "Guest"}</h4>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-col mt-[60px] gap-8">
          <Link to="/" className="flex flex-row gap-2 items-center">
            <FaHome />
            <h3 className="text-[18px] font-bold">Home</h3>
          </Link>
          <Link to="/explore" className="flex flex-row gap-2 items-center">
            <FaMap />
            <h3 className="text-[18px] font-bold">Explore</h3>
          </Link>
          <Link to="/adventures" className="flex flex-row gap-2 items-center">
            <FaBookmark />
            <h3 className="text-[18px] font-bold">Saved Adventures</h3>
          </Link>
          <Link to="/find" className="flex flex-row gap-2 items-center">
            <FaUserFriends />
            <h3 className="text-[18px] font-bold">People</h3>
          </Link>
          <Link to="/create-post" className="flex flex-row gap-2 items-center">
            <FaPlusCircle />
            <h3 className="text-[18px] font-bold">Create Post</h3>
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex justify-center">
        <button
          className="text-[14px] font-semibold bg-[#AEFF53] hover:bg-[#9ae745] rounded-full py-3 px-[80px]  transition"
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
