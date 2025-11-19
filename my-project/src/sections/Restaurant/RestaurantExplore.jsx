import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaSearch } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { restaurantsApi } from "../../lib/client";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

const RestaurantsExplore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const restaurantRef = useRef(null);
  const coffeeRef = useRef(null);
  const takeawayRef = useRef(null);
  const dessertRef = useRef(null);
  const hangoutRef = useRef(null);
  const breakfastRef = useRef(null);

  // dynamic active index keyed by categoryKey (identifiers)
  const [activeIndex, setActiveIndex] = useState({});

  const images = ["/foodpost1.png", "/foodpost2.png", "/foodpost3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); // matched shorter fade for snappy UX
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // fetch restaurants
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await restaurantsApi.list();
      setRestaurants(res.data || []);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // live search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredResults([]);
      return;
    }
    const q = search.toLowerCase();
    const results = restaurants.filter(
      (r) =>
        (r.name || "").toLowerCase().includes(q) ||
        (r.cuisine || "").toLowerCase().includes(q) ||
        (r.address || "").toLowerCase().includes(q)
    );
    setFilteredResults(results);
  }, [search, restaurants]);

  // robust category filter (case-insensitive, substring)
  const filterByCategory = (categoryKey) =>
    restaurants.filter((r) => {
      if (!r.category) return false;
      const cat = String(r.category).toLowerCase();
      return cat.includes(String(categoryKey).toLowerCase());
    });

  // scroll helper
  const scroll = (ref, direction) => {
    if (!ref?.current) return;
    const card = ref.current.querySelector(".carousel-card");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 16;
    ref.current.scrollTo({
      left:
        direction === "left"
          ? Math.max(0, ref.current.scrollLeft - scrollAmount)
          : ref.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // observe carousel and update activeIndex
  const observeCarousel = (ref, key) => {
    if (!ref?.current) return () => {};
    const container = ref.current;
    const cards = container.querySelectorAll(".carousel-card");
    if (!cards?.length) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setActiveIndex((prev) => ({ ...prev, [key]: idx }));
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  };

  // run observers when restaurants change (cards rendered)
  useEffect(() => {
    const cleanups = [
      observeCarousel(restaurantRef, "restaurant"),
      observeCarousel(coffeeRef, "coffee"),
      observeCarousel(takeawayRef, "takeaway"),
      observeCarousel(dessertRef, "dessert"),
      observeCarousel(hangoutRef, "hangout"),
      observeCarousel(breakfastRef, "breakfast"),
    ];
    return () => cleanups.forEach((f) => f && f());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  // Helper render function — categoryKey must be an identifier used by your backend (or substring matched)
  const renderCarousel = (title, categoryKey, ref) => {
    const catRestaurants = filterByCategory(categoryKey);

    return (
      <div className="flex flex-col 2xl:mt-[150px] mt-[50px]">
        <h2 className="md:text-[30px] text-[20px] text-black font-semibold">
          {title}
        </h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catRestaurants.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-8 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            >
              {catRestaurants.map((r, idx) => {
                const img = r.images?.[0]
                  ? r.images[0].startsWith("http")
                    ? r.images[0]
                    : `${API_URL}${r.images[0]}`
                  : "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/restaurants/${r._id}`}
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
                            if (r.rating >= starValue) return <FaStar key={i} />;
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

            {/* Scroll Buttons */}
            <button
              onClick={() => scroll(ref, "left")}
              className="flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(ref, "right")}
              className="flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={24} />
            </button>

            {/* Snap indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {catRestaurants.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex[categoryKey] === idx ? "bg-green-500 w-5" : "bg-black"
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
    <div className="flex flex-col px-4 md:px-[100px] mt-[100px] mb-[50px]">
      {/* Title + Search */}
      <div className="flex flex-col justify-center items-center relative">
        <h2 className="md:text-[36px] text-[26px] text-black text-center font-bold mb-2">
          Find New Restaurants
        </h2>
        <div className="flex px-2 py-1 md:py-2 md:px-1 items-center w-full md:w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686] relative">
          <FaSearch className="ml-4 text-black font-light md:text-3xl text-2xl" />
          <input
            type="text"
            placeholder="Search by name, cuisine, or area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[85%] px-6 py-3 focus:outline-none"
          />
        </div>

        {/* Search Results Dropdown */}
        {filteredResults.length > 0 && (
          <div className="absolute top-[100%] mt-2 w-full md:w-[80%] bg-white rounded-xl shadow-lg max-h-[300px] overflow-y-auto z-50">
            {filteredResults.map((r) => (
              <Link
                key={r._id}
                to={`/restaurants/${r._id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src={r.images?.[0] ? (r.images[0].startsWith("http") ? r.images[0] : `${API_URL}${r.images[0]}`) : "https://placehold.co/60x60"}
                  alt={r.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-black font-semibold">{r.name}</h3>
                  <p className="text-gray-500 text-sm">{r.cuisine}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Use normalized category keys for rendering */}
      {renderCarousel("Restaurants", "restaurant", restaurantRef)}
      {renderCarousel("Coffee Shops", "coffee", coffeeRef)}

      {/* Green banner */}
      <div className="relative w-full h-[500px] mt-[80px] rounded-2xl overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="/restaurantvid.MP4"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
            Taste the Best of Cape Town
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Discover top-rated restaurants, cafés, and hidden gems around every
            corner.
          </p>
        </div>
      </div>

      {renderCarousel("Student Takeaways", "takeaway", takeawayRef)}
      {renderCarousel("Dessert Places", "dessert", dessertRef)}
      {renderCarousel("Hangout Bars & Social Eateries", "hangout", hangoutRef)}

      <div className="w-full md:h-full h-[600px] mt-[80px] flex justify-center items-center rounded-2xl">
        <img
          src={images[currentIndex]}
          alt="banner"
          className={`w-full h-full md:object-cover rounded-2xl transition-opacity duration-500 md:hidden flex ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        <img
          src="/foodpost1.png"
          alt="banner"
          className="w-full h-full object-cover rounded-2xl md:flex hidden"
        />
      </div>

      {renderCarousel("Breakfast / Brunch Places", "breakfast", breakfastRef)}
    </div>
  );
};

export default RestaurantsExplore;