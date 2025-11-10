import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaHome,
  FaMap,
  FaBars,
  FaBookmark,
  FaUserFriends,
  FaPlusCircle,
  FaSignOutAlt, // logout icon
} from "react-icons/fa";
import { ChevronDown, ChevronUp, X } from "lucide-react"; // close icon
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { Link, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../auth/AuthContext"; // adjust path

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false); // 🔍 new state

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

  // Fetch data helper
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
    const fetchAdventures = async () => {
      try {
        const res = await fetch(`${API_URL}/api/adventures`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch adventures:", err);
      }
    };

    fetchAdventures();
  }, []);

  useEffect(() => {
    fetchData("events", setEvents);
    fetchData("stores", setStores);
    fetchData("restaurants", setRestaurants);
    fetchData("activities", setActivities);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) return setSearchResults([]);

    setIsSearching(true);
    const timer = setTimeout(() => {
      const taggedData = [
        ...seedEvents.map((item) => ({ ...item, type: "events" })),
        ...seedStores.map((item) => ({ ...item, type: "stores" })),
        ...seedRestaurants.map((item) => ({ ...item, type: "restaurants" })),
        ...seedActivities.map((item) => ({ ...item, type: "activities" })),
      ];

      const filtered = taggedData.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, seedEvents, seedStores, seedRestaurants, seedActivities]);

  // Auto slide in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // slight delay for smoother effect
    return () => clearTimeout(timer);
  }, []);

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

  const handleClick = (e, path) => {
    e.preventDefault(); // stop instant navigation
    setClicked(true);
    setTimeout(() => {
      navigate(path); // navigate to the correct page
      setClicked(false); // reset clicked for future animations
    }, 500); // match animation duration
  };

  const avatar =
    user?.profilePicture ||
    (user?.username
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
      : "/icons/profile-placeholder.svg");

  const toggleNav = () => {
    if (isOpen) {
      // Close with GSAP
      gsap.to(menuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => setIsOpen(false),
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    tl.to([".nav-logo", ".nav-menu-icon", ".nav-contact-btn"], {
      y: "0%",
      duration: 1.25,
      stagger: 0.1,
      toggleActions: "play reverse play reverse",
    });
  }, []);

  // Animate in when opening
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Animate dropdown opening
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          display: "block",
        }
      );
    } else {
      // Animate dropdown closing
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(dropdownRef.current, { display: "none" });
        },
      });
    }
  }, [isOpen]);

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

  useEffect(() => {
    const sections = document.querySelectorAll(".dark-section");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(".sidebar-links", { color: "#fff" }),
        onLeaveBack: () => gsap.to(".sidebar-links", { color: "#000" }),
      });
    });
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <div
        className={`fixed top-0 z-[40] w-full flex justify-center items-center md:px-[80px] px-4 transition-transform duration-500  ${
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
                className={`h-12 w-12 md:h-16 md:w-16  transform transition-transform duration-500 ease-in-out
          ${!animateIn ? "-translate-x-[1600%]" : ""}
          ${clicked ? "translate-x-[1600%]" : ""}`}
              />
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="w-full md:flex justify-end items-center z-[10] hidden gap-5 mix-blend-difference">
            <Link
              to="/restaurants"
              onClick={(e) => handleClick(e, "/restaurants")}
              aria-label="restaurants page"
              className="flex grandstander-uniquifier text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px] hover:scale-110 transition-transform duration-300 z-[100] cursor-pointer"
            >
              Restaurants
            </Link>
            <Link
              to="/stores"
              onClick={(e) => handleClick(e, "/stores")}
              aria-label="stores page"
              className="flex grandstander-uniquifier text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px] hover:scale-110 transition-transform duration-300 z-[100] cursor-pointer"
            >
              Stores
            </Link>
            <Link
              to="/events"
              onClick={(e) => handleClick(e, "/events")}
              aria-label="events page"
              className="flex grandstander-uniquifier text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px] hover:scale-110 transition-transform duration-300 z-[100] cursor-pointer"
            >
              Events
            </Link>
            <Link
              to="/activities"
              onClick={(e) => handleClick(e, "/activities")}
              aria-label="activities page"
              className="flex grandstander-uniquifier text-[#FF0000] hover:text-red-400 font-semibold md:text-[14px] text-[10px] hover:scale-110 transition-transform duration-300 z-[100] cursor-pointer"
            >
              Activities
            </Link>
          </div>

          <div className="w-full flex flex-col items-end md:hidden relative">
            {/* Header / Toggle Button */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <h2 className="text-[14px] font-bold text-[#FF0000] hover:scale-110 transition-transform duration-300">
                Adventures
              </h2>
              {isOpen ? (
                <ChevronUp size={16} className="text-[#FF0000]" />
              ) : (
                <ChevronDown size={16} className="text-[#FF0000]" />
              )}
            </div>

            {/* Dropdown Menu */}
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-40 py-2 z-50 hidden"
            >
              <Link
                to="/restaurants"
                className="block px-4 py-2 md:text-sm text-[12px] hover:bg-red-400 text-[#FF0000] font-semibold hover:text-white"
              >
                Restaurants
              </Link>
              <Link
                to="/events"
                className="block px-4 py-2 md:text-sm text-[12px] hover:bg-red-400 text-[#FF0000] font-semibold hover:text-white"
              >
                Events
              </Link>
              <Link
                to="/stores"
                className="block px-4 py-2 md:text-sm text-[12px] hover:bg-red-400 text-[#FF0000] font-semibold hover:text-white"
              >
                Stores
              </Link>
              <Link
                to="/activities"
                className="block px-4 py-2 md:text-sm text-[12px] hover:bg-red-400 text-[#FF0000] font-semibold hover:text-white"
              >
                Activities
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed left-0 top-0 h-screen bg-white border-r border-green-500 flex flex-col justify-between md:py-2 py-2
          w-20 sm:w-28 md:w-40 lg:w-56 xl:w-[20%] 2xl:w-[16%] z-[100]"
        >
          {/* Top Section */}
          <div className="flex flex-col items-center md:items-start pl-0 md:pl-8 gap-6">
            <div className="w-full flex flex-row justify-between pr-4 items-center">
              {/* Logo */}
              <Link to="/">
                <img
                  src="/paperplan.png"
                  alt="logo"
                  className="h-10 w-10 md:h-12 md:w-12 md:flex hidden"
                />
              </Link>

              {/* Close Icon */}
              <button
                onClick={toggleNav}
                className="flex items-center justify-center p-2 transition"
              >
                <X
                  size={28}
                  className="text-[#FF0000] hover:text-red-400 font-bold"
                />
              </button>
            </div>

            {/* Profile */}
            <Link to="/profile" className="flex gap-3 items-center">
              <img
                src={avatar}
                alt="profile"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full  object-cover"
              />
              <div className="hidden md:flex flex-col">
                <h4 className="text-base md:text-lg font-semibold text-black">
                  {user?.username || "Guest"}
                </h4>
              </div>
            </Link>

            {/* Navigation Links */}
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
          <div className="w-full flex justify-center items-center px-4">
            {/* Desktop Logout Button */}
            <button
              className="hidden md:block w-full md:w-auto text-xs md:text-sm font-semibold bg-[#FF0000] hover:bg-red-400
                text-white rounded-2xl py-2 px-6 md:px-10 transition"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              Log Out
            </button>

            {/* Mobile Logout Icon */}
            <button
              className="block md:hidden p-3 rounded-full bg-[#FF0000] hover:bg-red-400 transition"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <FaSignOutAlt className="text-white text-lg" />
            </button>
          </div>
        </div>
      )}
      {/* 🔍 Search Overlay */}
      {showSearch && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 w-full h-[150px] bg-white/70 backdrop-blur-md z-[110] flex flex-col justify-center items-center p-6"
        >
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-6 right-6 text-[#FF0000] hover:text-red-400 transition"
          >
            <X size={30} />
          </button>

          <h2 className="text-[#FF0000] text-[22px] md:text-3xl font-bold mb-6">
            Search Adventures
          </h2>

          <div className="relative w-full max-w-lg">
            <div className="flex items-center border-2 border-[#FF0000] rounded-full px-4 py-3 bg-white shadow-lg">
              <FaSearch className="text-[#FF0000] text-lg mr-3" />
              <input
                type="text"
                placeholder="Search by name, cuisine, or area"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg max-h-60 overflow-hidden z-30">
                {searchResults.map((r) => (
                  <Link
                    to={`/${r.type}/${r._id}`}
                    key={r._id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <img
                      src={r.images?.[0] || "https://placehold.co/100x100"}
                      alt={r.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{r.name}</p>
                      <p className="text-sm text-gray-500">
                        {r.address || r.cuisine || r.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
