import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaSearch } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RestaurantsExplore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const restaurantRef = useRef(null);
  const coffeeRef = useRef(null);
  const takeawayRef = useRef(null);
  const TikTokRef = useRef(null);
  const DessertRef = useRef(null);
  const HangoutRef = useRef(null);
  const BufferRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState({
    restaurant: 0,
    coffee: 0,
    takeaway: 0,
    TikTok: 0,
    Dessert: 0,
    Hangout: 0,
    Buffer: 0,
  });

  const fetchRestaurants = async (q = "") => {
    try {
      setLoading(true);
      const url = q
        ? `${API_URL}/api/restaurants?q=${encodeURIComponent(q)}`
        : `${API_URL}/api/restaurants`;
      const res = await fetch(url);
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
    restaurants.filter(
      (r) =>
        r.category === category &&
        (r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
          r.address?.toLowerCase().includes(search.toLowerCase()))
    );

  // --- IntersectionObserver for snap indicators ---
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
      observeCarousel(restaurantRef, "restaurant"),
      observeCarousel(coffeeRef, "coffee"),
      observeCarousel(takeawayRef, "takeaway"),
      observeCarousel(TikTokRef, "TikTok"),
      observeCarousel(DessertRef, "Dessert"),
      observeCarousel(HangoutRef, "Hangout"),
      observeCarousel(BufferRef, "Buffer"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [restaurants]);

  // --- Helper to render carousel section ---
  const renderCarousel = (title, key, ref) => {
    const catRestaurants = filterByCategory(key);

    return (
      <div className="flex flex-col mt-[50px]">
        <h2 className="text-[30px] font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catRestaurants.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 px-2 scrollbar-hide"
            >
              {catRestaurants.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/restaurants/${r._id}`}
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

            {/* Scroll Buttons */}
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

            {/* Snap indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {catRestaurants.map((_, idx) => (
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
    <div className="flex flex-col px-4 md:px-[100px] my-[50px]">
      {/* Title + Search */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-[36px] text-center font-bold mb-2">
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
            onClick={() => fetchRestaurants(search)}
            type="submit"
            className="px-6 py-3 bg-[#aeff53] hover:bg-[#78af39] text-black text-[14px] font-semibold rounded-full transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Explicit sections */}
      {renderCarousel("Restaurants", "restaurant", restaurantRef)}
      {renderCarousel("Coffee Shops", "coffee", coffeeRef)}

      {/* Green banner between Coffee and Takeaways */}
      <div className="w-100% h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img />
      </div>

      {renderCarousel("Student Takeaways", "takeaway", takeawayRef)}
      {renderCarousel("TikTok Recommendations", "TikTok", TikTokRef)}
      {renderCarousel("Dessert Places", "Dessert", DessertRef)}
      {renderCarousel("Hangout Bars & Social Eateries", "Hangout", HangoutRef)}

      {/* Green banner between Coffee and Takeaways */}
      <div className="w-100% h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img />
      </div>
      {renderCarousel("Breakfast / Brunch Places", "Breakfast / Brunch Places", BufferRef)}
    </div>
  );
};

export default RestaurantsExplore;
