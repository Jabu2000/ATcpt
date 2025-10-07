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

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [animateIn, setAnimateIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Auto slide in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // slight delay for smoother effect
    return () => clearTimeout(timer);
  }, []);

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
              className="flex grandstander-uniquifier text-[#FF0000] rounded-3xl font-semibold md:text-[14px] text-[10px] z-[100] cursor-pointer"
            >
              Restaurants
            </Link>
            <Link
              to="/stores"
              onClick={(e) => handleClick(e, "/stores")}
              aria-label="stores page"
              className="flex grandstander-uniquifier text-[#FF0000] rounded-3xl font-semibold md:text-[14px] text-[10px] z-[100] cursor-pointer"
            >
              Stores
            </Link>
            <Link
              to="/events"
              onClick={(e) => handleClick(e, "/events")}
              aria-label="events page"
              className="flex grandstander-uniquifier text-[#FF0000] rounded-3xl font-semibold md:text-[14px] text-[10px] z-[100] cursor-pointer"
            >
              Events
            </Link>
            <Link
              to="/activities"
              onClick={(e) => handleClick(e, "/activities")}
              aria-label="activities page"
              className="flex grandstander-uniquifier text-[#FF0000] rounded-3xl font-semibold md:text-[14px] text-[10px] z-[100] cursor-pointer"
            >
              Activities
            </Link>
            <Link
              to="/places"
              aria-label="places page"
              onClick={(e) => handleClick(e, "/places")}
              className="flex grandstander-uniquifier text-[#FF0000] rounded-3xl font-semibold md:text-[14px] text-[10px] z-[100] cursor-pointer"
            >
              Places
            </Link>
          </div>

          <div className="w-full flex flex-col items-end md:hidden relative">
            {/* Header / Toggle Button */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <h2 className="text-[14px] font-bold text-[#FF0000]">
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
                className="block px-4 py-2 text-sm hover:bg-[#FF0000] text-black hover:text-white"
              >
                Restaurants
              </Link>
              <Link
                to="/events"
                className="block px-4 py-2 text-sm hover:bg-[#FF0000] text-black hover:text-white"
              >
                Events
              </Link>
              <Link
                to="/places"
                className="block px-4 py-2 text-sm hover:bg-[#FF0000] text-black hover:text-white"
              >
                Places
              </Link>
              <Link
                to="/stores"
                className="block px-4 py-2 text-sm hover:bg-[#FF0000] text-black hover:text-white"
              >
                Stores
              </Link>
              <Link
                to="/activities"
                className="block px-4 py-2 text-sm hover:bg-[#FF0000] text-black hover:text-white"
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
          className="fixed left-0 top-0 h-screen bg-white border-r border-[#AEFF53] flex flex-col justify-between md:py-6 py-2
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
                className="flex items-center justify-center p-2 rounded-full hover:bg-[#AEFF53] transition"
              >
                <X size={28} className="text-black" />
              </button>
            </div>

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

            {/* Navigation Links */}
            <div className="flex flex-col gap-8 text-black mt-4 ">
              <Link to="/" className="flex items-center gap-3">
                <FaHome className="text-xl" />
                <h3 className="hidden md:block text-base font-bold text-[20px]">
                  Home
                </h3>
              </Link>
              <Link to="/search" className="flex items-center gap-3">
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
              <Link to="/create-post" className="flex items-center gap-3">
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
              className="hidden md:block w-full md:w-auto text-xs md:text-sm font-semibold bg-[#AEFF53] hover:bg-[#9ae745] 
                text-black hover:text-white rounded-full py-2 px-6 md:px-10 transition"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              Log Out
            </button>

            {/* Mobile Logout Icon */}
            <button
              className="block md:hidden p-3 rounded-full bg-[#AEFF53] hover:bg-[#9ae745] transition"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <FaSignOutAlt className="text-black text-lg" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
