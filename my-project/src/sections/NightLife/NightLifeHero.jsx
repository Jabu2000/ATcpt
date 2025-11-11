import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const NightLifeHero = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef(null);

  // --- Fetch events from backend ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  // --- Live search filter ---
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const results = events.filter(
      (r) =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
        r.address?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results.slice(0, 6)); // show only top 6 results
    setShowDropdown(true);
  }, [search, events]);

  // --- Click outside to close ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center sm:justify-start"
      style={{ backgroundImage: "url(/event1.png)" }}
    >
      <div className="w-full sm:w-[80%] lg:w-[60%] px-6 sm:px-12 lg:pl-[80px] sm:text-left">
        <h1 className="text-white font-extrabold leading-tight title w-[80%] 2xl:text-[150px] md:text-[100px] text-[50px] mb-4">
          Night Life And Events
        </h1>
        <p className="text-white md:text-[18px] text-[16px] max-w-[700px] mx-auto sm:mx-0 mb-6">
          Built by a creative for creatives. Future artist and creatives.
          Painting the black and white world with color.
        </p>

        {/* Search Section */}
        <div
          ref={searchRef}
          className="flex flex-col relative"
        >
          <div className="flex px-2 py-1 md:py-2 md:px-1 items-center w-full md:w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686] relative">
            <FaSearch className="ml-4 text-black font-light md:text-3xl text-2xl" />
            <input
              type="text"
              placeholder="Search events, or clubs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              className="w-[85%] px-6 py-3 focus:outline-none"
            />
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-[100%] mt-2 w-full md:w-[80%] bg-white rounded-xl shadow-lg max-h-[300px] overflow-y-auto z-50">
              {searchResults.map((r) => (
                <Link
                  key={r._id}
                  to={`/events/${r._id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition"
                  onClick={() => setShowDropdown(false)} // close on select
                >
                  <img
                    src={r.images?.[0] || "https://placehold.co/60x60"}
                    alt={r.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-black font-semibold">{r.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {r.cuisine || r.address}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NightLifeHero;
