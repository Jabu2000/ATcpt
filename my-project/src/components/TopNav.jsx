import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [hasShadow, setHasShadow] = useState(false);

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
      <Link to="/" className="flex items-center gap-2">
        <img src="/paperplan.png" alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
        <h1 className="text-lg sm:text-xl font-bold text-white">Adventure Time</h1>
      </Link>
    </div>
  );
};

export default TopNav;