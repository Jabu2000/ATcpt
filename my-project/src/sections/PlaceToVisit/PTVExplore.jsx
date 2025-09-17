import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const PTVExplore = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const NatureOutdoorsRef = useRef(null);
  const HistoricalCulturalRef = useRef(null);
  const EntertainmentRef = useRef(null);
  const SocialActivitiesRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState({
    NatureOutdoors: 0,
    HistoricalCultural: 0,
    Entertainment: 0,
    SocialActivities: 0,
  });

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/places`);
      const data = await res.json();
      setPlaces(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
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
    places.filter((r) => r.category === category);

  const observeCarousel = (ref, key) => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
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
      observeCarousel(NatureOutdoorsRef, "NatureOutdoors"),
      observeCarousel(HistoricalCulturalRef, "HistoricalCultural"),
      observeCarousel(EntertainmentRef, "Entertainment"),
      observeCarousel(SocialActivitiesRef, "SocialActivities"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [places]);

  const renderCarousel = (title, key, ref) => {
    const catPlaces = filterByCategory(key);

    return (
      <div className="flex flex-col mt-[50px]">
        <h2 className="text-[30px] font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catPlaces.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 px-2 scrollbar-hide"
            >
              {catPlaces.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/places/${r._id}`}
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
              {catPlaces.map((_, idx) => (
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
      {renderCarousel("Nature Out doors", "NatureOutdoors", NatureOutdoorsRef)}
      {renderCarousel(
        "Historical & Cultural",
        "HistoricalCultural",
        HistoricalCulturalRef
      )}

      {/* Green banner */}
      <div className="w-full h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>

      {renderCarousel("Entertainments", "Entertainment", EntertainmentRef)}
      {renderCarousel("Social Activities", "SocialActivities", SocialActivitiesRef)}

      {/* Green banner */}
      <div className="w-full h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>
    </div>
  );
};

export default PTVExplore;