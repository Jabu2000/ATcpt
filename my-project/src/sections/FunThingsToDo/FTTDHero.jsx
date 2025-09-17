import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const FTTDHero = () => {
  const [seedActivities, setSeedActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Carousel Refs ---
  const indooractivitiesRef = useRef(null);
  const outdooractivitiestRef = useRef(null);
  const adventureRef = useRef(null);
  const relaxationRef = useRef(null);
  const culturalRef = useRef(null);
  const friendsRef = useRef(null);

  // Fetch activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/activities");
        const data = await res.json();
        setSeedActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const [activeIndex, setActiveIndex] = useState({
    IndoorActivities: 0,
    OutdoorActivities: 0,
    Adventure: 0,
    Relaxation: 0,
    Cultural: 0,
    Friends: 0,
  });

  // --- Slideshow ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        seedActivities.length > 0 ? (prev + 1) % seedActivities.length : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [seedActivities]);

  // --- Fetch activities ---
  const fetchActivities = async (q = "") => {
    try {
      setLoading(true);
      const url = q
        ? `${API_URL}/api/activities?q=${encodeURIComponent(q)}`
        : `${API_URL}/api/activities`;
      const res = await fetch(url);
      const data = await res.json();
      setActivities(data);

      // 👇 pick first image per category for hero slider
      const categories = [
        "IndoorActivities",
        "OutdoorActivities",
        "Adventure",
        "Relaxation",
        "Cultural",
        "Friends",
      ];

      const catImages = categories
        .map((cat) => {
          const activity = data.find(
            (a) => a.category === cat && a.images?.[0]
          );
          return activity ? activity.images[0] : null;
        })
        .filter(Boolean);

      setSeedActivities(catImages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(); // fetch all on mount
  }, []);

  // --- Scroll helpers ---
  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const card = ref.current.querySelector(".carousel-card");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 16;
    ref.current.scrollTo({
      left:
        direction === "left"
          ? ref.current.scrollLeft - scrollAmount
          : ref.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const filterByCategory = (category) =>
    activities.filter(
      (r) =>
        r.category === category &&
        (search === "" ||
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
          r.address?.toLowerCase().includes(search.toLowerCase()))
    );

  // --- IntersectionObserver for indicators ---
  const observeCarousel = (ref, key) => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index);
            setActiveIndex((prev) => ({ ...prev, [key]: idx }));
          }
        });
      },
      { root: ref.current, threshold: 0.6 }
    );
    const cards = ref.current.querySelectorAll(".carousel-card");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  };

  useEffect(() => {
    const cleanups = [
      observeCarousel(indooractivitiesRef, "IndoorActivities"),
      observeCarousel(outdooractivitiestRef, "OutdoorActivities"),
      observeCarousel(adventureRef, "Adventure"),
      observeCarousel(relaxationRef, "Relaxation"),
      observeCarousel(culturalRef, "Cultural"),
      observeCarousel(friendsRef, "Friends"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [activities]);

  // --- Reusable carousel ---
  const renderCarousel = (title, key, ref) => {
    const catActivities = filterByCategory(key);

    return (
      <div className="flex flex-col mt-[50px]">
        <h2 className="text-[30px] font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catActivities.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 px-2 scrollbar-hide"
            >
              {catActivities.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/activities/${r._id}`}
                    key={r._id}
                    data-index={idx}
                    className="carousel-card snap-center min-w-[220px] sm:min-w-[250px] md:min-w-[265px] max-w-[275px] flex-shrink-0 bg-white rounded-2xl shadow-md"
                  >
                    <img
                      src={img}
                      alt={r.name}
                      className="w-full h-[35vh] sm:h-[40vh] object-cover rounded-t-2xl"
                    />
                    <div className="p-3">
                      <h2 className="font-semibold text-lg mb-1">{r.name}</h2>
                      {typeof r.rating === "number" && (
                        <div className="flex items-center gap-1 text-[#FAA500]">
                          {Array.from({ length: 5 }, (_, i) => {
                            const starValue = i + 1;
                            if (r.rating >= starValue)
                              return <FaStar key={i} />;
                            else if (r.rating >= starValue - 0.5)
                              return <FaStarHalfAlt key={i} />;
                            else return <FaRegStar key={i} />;
                          })}
                          <span className="ml-2 text-sm text-black">
                            {r.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Scroll buttons */}
            <button
              onClick={() => scroll(ref, "left")}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(ref, "right")}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {catActivities.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex[key] === idx ? "bg-black w-5" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section with Search */}
      <div className="flex justify-center items-center">
        <div className="w-[90%] mt-24 rounded-3xl h-[75vh] relative overflow-hidden">
          {seedActivities.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`slide-${index}`}
              className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 flex flex-col mt-10 text-center items-center pt-[80px] px-4 sm:px-6 md:px-12 z-20">
            <h2 className="text-white text-[36px] text-center font-bold mb-2">
              Find New Places
            </h2>
            <div className="flex px-2 py-2 justify-center items-center w-full md:w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686]">
              <FaSearch className="ml-4 text-black font-light text-3xl transition duration-300 hover:scale-110 cursor-pointer" />
              <input
                type="text"
                placeholder="Search by name, cuisine, or area"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 focus:outline-none"
              />
              <button
                onClick={() => fetchActivities(search)}
                type="submit"
                className="px-6 py-3 bg-[#aeff53] hover:bg-[#78af39] text-black text-[14px] font-semibold rounded-full transition"
              >
                Search
              </button>
            </div>
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-40 z-10 rounded-2xl"></div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="flex flex-col px-4 md:px-[100px] my-[50px]">
        {renderCarousel(
          "Indoor Activities",
          "IndoorActivities",
          indooractivitiesRef
        )}

        <div className="w-100% h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
          <img />
        </div>

        {renderCarousel("Outdoor Activities", "OutdoorActivities", outdooractivitiestRef)}
        {renderCarousel("Adventure", "Adventure", adventureRef)}
        {/* {renderCarousel("Relaxation", "Relaxation", relaxationRef)} */}
        {renderCarousel("Cultural Experiences", "Cultural", culturalRef)}
        {renderCarousel("Fun with Friends", "Friends", friendsRef)}

        <div className="w-100% h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
          <img />
        </div>
      
      </div>
    </>
  );
};

export default FTTDHero;
