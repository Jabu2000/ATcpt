import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaHome,
  FaMap,
  FaBars,
  FaBookmark,
  FaUserFriends,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [animateIn, setAnimateIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [seedEvents, setEvents] = useState([]);
  const [seedStores, setStores] = useState([]);
  const [seedRestaurants, setRestaurants] = useState([]);
  const [seedActivities, setActivities] = useState([]);

  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`${API_URL}/api/${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
    }
  };

  useEffect(() => {
    fetchData("events", setEvents);
    fetchData("stores", setStores);
    fetchData("restaurants", setRestaurants);
    fetchData("activities", setActivities);
  }, []);

  // Scroll hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNavbar(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle search overlay
  const openSearch = () => setShowSearch(true);
  const closeSearch = () => {
    gsap.to(searchRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => setShowSearch(false),
    });
  };

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

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e, path) => {
    e.preventDefault();
    setClicked(true);
    setTimeout(() => {
      navigate(path);
      setClicked(false);
    }, 500);
  };

  return (
    <>
      {/* Top Navbar */}
      <div
        className={`fixed top-0 z-[40] w-full flex justify-center items-center md:px-[80px] px-4 transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full flex justify-between items-center ">
          {/* Menu Icon */}
          <div className="w-full flex justify-start cursor-pointer">
            <button
              onClick={toggleNav}
              className="p-2 rounded-md transition mix-blend-difference"
              aria-label="Open menu"
            >
              <img
                src="/Menu1.png"
                alt="Menu"
                className="text-2xl hover:scale-110 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Logo */}
          <div className="w-full flex justify-center items-center cursor-pointer">
            <Link to="/" onClick={(e) => handleClick(e, "/")}>
              <img
                src="/paperplan.png"
                alt="logo"
                className={`h-12 w-12 md:h-16 md:w-16 transform transition-transform duration-500 ease-in-out
                  ${!animateIn ? "-translate-x-[1600%]" : ""} ${
                  clicked ? "translate-x-[1600%]" : ""
                }`}
              />
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="w-full md:flex justify-end items-center z-[10] hidden gap-5 mix-blend-difference">
            <Link
              to="/restaurants"
              onClick={(e) => handleClick(e, "/restaurants")}
              className="flex text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px]"
            >
              Restaurants
            </Link>
            <Link
              to="/stores"
              onClick={(e) => handleClick(e, "/stores")}
              className="flex text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px]"
            >
              Stores
            </Link>
            <Link
              to="/events"
              onClick={(e) => handleClick(e, "/events")}
              className="flex text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px]"
            >
              Events
            </Link>
            <Link
              to="/activities"
              onClick={(e) => handleClick(e, "/activities")}
              className="flex text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px]"
            >
              Activities
            </Link>

            {/* Show profile / logout only if logged in */}
            {user ? (
              <>
                <button
                  className="ml-4 bg-[#FF0000] hover:bg-red-400 text-white py-1 px-4 rounded-2xl text-sm transition"
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-[#FF0000] hover:bg-red-400 text-white py-1 px-4 rounded-2xl text-sm transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isOpen && user && (
        <div
          ref={menuRef}
          className="fixed left-0 top-0 h-screen bg-white border-r border-green-500 flex flex-col justify-between md:py-2 py-2 w-56 z-[100]"
        >
          <div className="flex flex-col items-center md:items-start pl-8 gap-6">
            <div className="w-full flex flex-row justify-between pr-4 items-center">
              <Link to="/">
                <img
                  src="/paperplan.png"
                  alt="logo"
                  className="h-12 w-12 md:flex hidden"
                />
              </Link>
              <button onClick={toggleNav}>
                <X size={28} className="text-[#FF0000] hover:text-red-400" />
              </button>
            </div>

            <Link to="/profile" className="flex gap-3 items-center">
              <img
                src={avatar}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h4 className="text-base md:text-lg font-semibold text-black">
                  {user.username}
                </h4>
              </div>
            </Link>

            <div className="flex flex-col gap-8 text-black mt-4">
              <Link
                to="/"
                className="flex items-center gap-3 text-black hover:text-[#FF0000]"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/explore"
                className="flex items-center gap-3 text-black hover:text-[#FF0000]"
              >
                <FaMap /> Explore
              </Link>
              <Link
                to="/create-post"
                className="flex items-center gap-3 text-black hover:text-[#FF0000]"
              >
                <FaPlusCircle /> Create
              </Link>
            </div>

            <button
              className="w-full bg-[#FF0000] hover:bg-red-400 text-white py-2 px-4 rounded-2xl mt-4"
              onClick={async () => {
                await logout();
                navigate("/auth");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
