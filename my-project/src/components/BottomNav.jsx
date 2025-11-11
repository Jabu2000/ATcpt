import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext"; // adjust path
import { FaHome, FaMap, FaPlusCircle, FaSearch } from "react-icons/fa";
import { X } from "lucide-react";
import gsap from "gsap";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  
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
    }, [
      searchQuery,
      seedEvents,
      seedStores,
      seedRestaurants,
      seedActivities,
    ]);

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

export default BottomNav;
