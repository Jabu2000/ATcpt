import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaSearch } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const FTTDCategories = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const activitieRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState({
    IndoorActivities: 0,
  });

  const categories = [
    { key: "IndoorActivities", title: "In door Activities", ref: activitieRef },
  ];

  const fetchActivities = async (q = "") => {
    try {
      setLoading(true);
      const url = q
        ? `${API_URL}/api/activities?q=${encodeURIComponent(q)}`
        : `${API_URL}/api/activities`;
      const res = await fetch(url);
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
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

  const filterByCategory = (category) => {
    return activities.filter((r) => r.category === category);
  };

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
      { root: ref.current, threshold: 0.6 } // 60% visible
    );
    const cards = ref.current.querySelectorAll(".carousel-card");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  };

  useEffect(() => {
    categories.forEach((cat) => {
      const cleanup = observeCarousel(
        cat.ref,
        cat.key,
        filterByCategory(cat.key)
      );
      return cleanup;
    });
  });

  return (
    <div className="flex flex-col px-4 md:px-[100px] my-[50px]">
      {/* Category Carousels */}
      {categories.map((cat) => {
        const catActivities = filterByCategory(cat.key);
        return (
          <div key={cat.key} className="flex flex-col mt-[50px]">
            <h2 className="text-[30px] font-semibold">{cat.title}</h2>
            {loading ? (
              <p className="text-gray-500 mt-2">
                Loading {cat.title.toLowerCase()}…
              </p>
            ) : catActivities.length === 0 ? (
              <p className="text-gray-500 mt-2">
                No {cat.title.toLowerCase()} found.
              </p>
            ) : (
              <div className="relative group mt-6">
                <div
                  ref={cat.ref}
                  className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 px-2 scrollbar-hide"
                >
                  {catActivities.map((r, idx) => {
                    const img =
                      r.images?.[0] ||
                      "https://placehold.co/600x400?text=Image";
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
                          <h2 className="font-semibold text-lg mb-1">
                            {r.name}
                          </h2>
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
                  onClick={() => scroll(cat.ref, "left")}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll(cat.ref, "right")}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Snap indicators */}
                <div className="flex justify-center mt-2 gap-2">
                  {catActivities.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeIndex[cat.key] === idx
                          ? "bg-black w-5"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FTTDCategories;
