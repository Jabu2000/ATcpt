import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const PTVHero = () => {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef(null);

  // --- Fetch places from backend ---
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`${API_URL}/api/places`);
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error("Failed to fetch places:", err);
      }
    };

    fetchPlaces();
  }, []);

  // --- Live search filter ---
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const results = places.filter(
      (r) =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
        r.address?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results.slice(0, 6)); // show only top 6 results
    setShowDropdown(true);
  }, [search, places]);

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
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 sm:px-8"
      style={{ backgroundImage: "url(/Visit.png)" }}
    >
      {/* Heading */}
      <h1 className="w-full sm:w-[80%] lg:w-[60%] text-center text-white font-extrabold leading-tight 2xl:text-[150px] md:text-[100px] text-[50px]">
        Places To Visit
      </h1>

      {/* Paragraph */}
      <p className="mt-6 w-full sm:w-3/4 lg:w-3/5 text-center text-white md:text-[18px] text-[16px] px-2 sm:px-6">
        Built by a creative for creatives. Future artist and creatives. Painting
        the black and white world with color. Built by a creative for creatives.
        Future artist and creatives. Painting the black and white world with
        color. Built by a creative for creatives.
      </p>

      {/* Search Section */}
      <div ref={searchRef} className="w-full sm:w-3/4 lg:w-3/5 flex mt-4 justify-center items-center flex-col relative">
        <div className="flex px-2 py-1 md:py-2 md:px-1 items-center w-full md:w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686] relative">
          <FaSearch className="ml-4 text-black font-light md:text-3xl text-2xl" />
          <input
            type="text"
            placeholder="Search by name, or area"
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
                to={`/places/${r._id}`}
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
  );
};

export default PTVHero;
