import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ExploreHero = () => {
  const [seedEvents, setEvents] = useState([]);
  const [seedPlaces, setPlaces] = useState([]);
  const [seedStores, setStores] = useState([]);
  const [seedRestaurants, setRestaurants] = useState([]);
  const [seedActivities, setActivities] = useState([]);
  const [seedAccommodations, setAccommodations] = useState([]);

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
    fetchData("places", setPlaces);
    fetchData("stores", setStores);
    fetchData("restaurants", setRestaurants);
    fetchData("activities", setActivities);
    fetchData("accommodations", setAccommodations);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) return setSearchResults([]);

    setIsSearching(true);
    const timer = setTimeout(() => {
      const taggedData = [
        ...seedEvents.map((item) => ({ ...item, type: "events" })),
        ...seedPlaces.map((item) => ({ ...item, type: "places" })),
        ...seedStores.map((item) => ({ ...item, type: "stores" })),
        ...seedRestaurants.map((item) => ({ ...item, type: "restaurants" })),
        ...seedActivities.map((item) => ({ ...item, type: "activities" })),
        ...seedAccommodations.map((item) => ({ ...item, type: "accommodations" })),
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
    seedPlaces,
    seedStores,
    seedRestaurants,
    seedActivities,
    seedAccommodations,
  ]);

  return (
    <div className="md:px-[90px] px-6 md:pt-[120px] pt-[50px]">
      {/* Title */}
      <h1 className="flex justify-center text-black text-center leading-none font-extrabold 2xl:mt-[100px] mt-[40px] text-[40px] sm:text-[70px] md:text-[100px] xl:text-[150px]">
        Adventure Time
      </h1>

      {/* Subtitle + Search */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-12">
        <h2 className="md:text-[36px] text-[18px] font-semibold text-center mb-2">
          Things To Do In Cape Town
        </h2>

        <div className="relative w-full md:w-[80%]">
          <div className="flex px-2 py-1 md:py-2 md:px-1 items-center bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686]">
            <FaSearch className="ml-4 text-black font-light md:text-2xl text-[18px]" />
            <input
              type="text"
              placeholder="Search by name, cuisine, or area"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[80%] px-6 py-3 focus:outline-none"
            />
          </div>

          {/* 🔍 Live Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto z-30">
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
                  <div className="text-left">
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

      {/* Featured Sections */}
      <div className="md:mt-[100px] mt-[60px]">
        <h2 className="md:text-[30px] text-[20px] font-semibold mb-6 text-left">
          Featured Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Top Adventures", img: "/restaurant.jpg" },
            { title: "Upcoming Events", img: "/restaurant.jpg" },
            { title: "Spots", img: "/restaurant.jpg" },
          ].map((card, i) => (
            <div
              key={i}
              className="relative flex rounded-lg overflow-hidden"
            >
              <img
                src={card.img}
                alt={card.title}
                className="rounded-2xl w-full h-[200px] sm:h-[250px] object-cover"
              />
              <h3 className="absolute bottom-4 pl-4 text-white text-[18px] sm:text-[20px] font-semibold drop-shadow-lg">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;