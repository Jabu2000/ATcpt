import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  const [hasShadow, setHasShadow] = useState(false);
   const navigate = useNavigate();
  
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

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black border-b border-gray-800 
      flex items-center sm:justify-start px-4 py-3 z-50 lg:hidden transition-shadow
      ${hasShadow ? "shadow-md shadow-black/40" : ""}`}
    >
      {/* Logo + Name */}
      <Link to="/" onClick={(e) => handleClick(e, "/")} className="flex items-center gap-2">
        <img
          src="/paperplan.png"
          alt="logo"
          className={`h-8 w-8 md:h-10 md:w-10  transform transition-transform duration-500 ease-in-out
          ${!animateIn ? "-translate-x-[1600%]" : ""}
          ${clicked ? "translate-x-[1600%]" : ""}`}
        />
        <h1 className="text-lg sm:text-xl font-bold text-white">
          Adventure Time
        </h1>
      </Link>
    </div>
  );
};

export default TopNav;
