import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

const FTTDHero = () => {
  const [seedActivities, setSeedActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Fade effect for hero images ---
  const [fade, setFade] = useState(true);

  const searchRef = useRef(null);

  // --- Carousel Refs ---
  const indooractivitiesRef = useRef(null);
  const outdooractivitiestRef = useRef(null);
  const adventureRef = useRef(null);
  const relaxationRef = useRef(null);
  const culturalRef = useRef(null);
  const friendsRef = useRef(null);

  // --- Hero Slideshow ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        seedActivities.length > 0 ? (prev + 1) % seedActivities.length : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [seedActivities]);

  // --- Fetch activities ---
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/activities`);
      const data = await res.json();
      setActivities(data);

      // seed hero images
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
    fetchActivities();
  }, []);

  // --- Live search filter ---
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results = activities.filter(
      (r) =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
        r.address?.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(results.slice(0, 6)); // limit results
    setShowDropdown(true);
  }, [search, activities]);

  // --- Close dropdown on outside click ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    activities.filter((r) => r.category === category);

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

  const [activeIndex, setActiveIndex] = useState({
    IndoorActivities: 0,
    OutdoorActivities: 0,
    Adventure: 0,
    Relaxation: 0,
    Cultural: 0,
    Friends: 0,
  });

  const images = ["/activitiespost1.png", "/activitiespost2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true); // fade-in
      }, 500); // fade duration (must match CSS transition)
    }, 4000); // time per image

    return () => clearInterval(interval);
  }, [images.length]);

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
      <div className="flex flex-col 2xl:mt-[150px] mt-[50px]">
        <h2 className="md:text-[30px] text-[20px] text-black font-semibold">
          {title}
        </h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catActivities.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-8 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4  scrollbar-hide"
            >
              {catActivities.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/activities/${r._id}`}
                    key={r._id}
                    data-index={idx}
                    className="carousel-card snap-center md:w-[270px] w-[200px] flex-shrink-0"
                  >
                    <img
                      src={img}
                      alt={r.name}
                      className="w-full md:h-[350px] h-[240px] object-cover rounded-2xl"
                    />
                    <div className="py-3">
                      <h2 className="font-semibold text-black md:text-lg text-[14px] mb-1">
                        {r.name}
                      </h2>
                      {typeof r.rating === "number" && (
                        <div className="flex items-center md:text-[16px] text-[12px] gap-1 text-[#FAA500]">
                          {Array.from({ length: 5 }, (_, i) => {
                            const starValue = i + 1;
                            if (r.rating >= starValue)
                              return <FaStar key={i} />;
                            else if (r.rating >= starValue - 0.5)
                              return <FaStarHalfAlt key={i} />;
                            else return <FaRegStar key={i} />;
                          })}
                          <span className="ml-2 md:text-sm text-[12px] text-black">
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
              className="flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(ref, "right")}
              className=" flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={24} />
            </button>
            {/* Indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {catActivities.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex[key] === idx
                      ? "bg-green-500 w-5"
                      : "bg-[#000000]"
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
      <div className="flex justify-center items-center px-4 md:px-[60px]">
        <div className="w-full mt-24 rounded-3xl h-[75vh] relative overflow-hidden">
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
            <h2 className="text-white md:text-[36px] text-[26px] text-center font-bold mb-2">
              Find Things To Do
            </h2>
            <div
              ref={searchRef}
              className="relative flex flex-col w-full md:w-[80%]"
            >
              <div className="flex px-2 py-1 md:py-2 md:px-1 items-center bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686]">
                <FaSearch className="ml-4 text-black font-light md:text-3xl text-2xl" />
                <input
                  type="text"
                  placeholder="Search by activity, or area"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() =>
                    searchResults.length > 0 && setShowDropdown(true)
                  }
                  className="w-full px-6 py-3 focus:outline-none rounded-full"
                />
              </div>
              {/* Search results dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute top-[100%] mt-2 w-full bg-white rounded-xl shadow-lg max-h-[300px] overflow-y-auto z-50">
                  {searchResults.map((r) => (
                    <Link
                      key={r._id}
                      to={`/activities/${r._id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition"
                      onClick={() => setShowDropdown(false)}
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
        <div className="relative w-full h-[500px] mt-[80px] rounded-2xl overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="/activitiesvid.MP4"
            autoPlay
            muted
            loop
            playsInline
          ></video>

          {/* Optional overlay text */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
              Explore More Activities 
            </h2>
            <p className="text-white md:text-lg text-sm">
              Discover a variety of fun things to do for everyone!
            </p>
          </div>
        </div>
        {renderCarousel(
          "Outdoor Activities",
          "OutdoorActivities",
          outdooractivitiestRef
        )}
        {renderCarousel("Adventure", "Adventure", adventureRef)}
        {renderCarousel("Cultural Experiences", "Cultural", culturalRef)}
        {renderCarousel("Fun with Friends", "Friends", friendsRef)}
        <div className="w-full md:h-full h-[600px] mt-[80px] flex justify-center items-center rounded-2xl">
          <img
            src={images[currentIndex]}
            alt="banner"
            className={`w-full h-full md:object-cover rounded-2xl transition-opacity duration-500 md:hidden flex ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />

          <img
            src="/activitiespost1.png"
            alt="banner"
            className="w-full h-full object-cover rounded-2xl md:flex hidden"
          />
        </div>
      </div>
    </>
  );
};

export default FTTDHero;
