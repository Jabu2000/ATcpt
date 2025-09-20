import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const NightLifeExplore = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const ClubNightsPartiesRef = useRef(null);
  const MusicOpenMicRef = useRef(null);
  const CreativeEventsRef = useRef(null);
  const SocialNightsRef = useRef(null);
  const OutdoorNightEventsRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState({
    ClubNightsParties: 0,
    MusicOpenMic: 0,
    CreativeEvents: 0,
    SocialNights: 0,
    OutdoorNightEvents: 0,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
    events.filter((r) => r.category === category);

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
      observeCarousel(ClubNightsPartiesRef, "ClubNightsParties"),
      observeCarousel(MusicOpenMicRef, "MusicOpenMic"),
      observeCarousel(CreativeEventsRef, "CreativeEvents"),
      observeCarousel(SocialNightsRef, "SocialNights"),
      observeCarousel(OutdoorNightEventsRef, "OutdoorNightEvents"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [events]);

  const renderCarousel = (title, key, ref) => {
    const catEvents = filterByCategory(key);

    return (
       <div className="flex flex-col 2xl:mt-[150px] mt-[50px]">
        <h2 className="md:text-[30px] text-[20px] text-white font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catEvents.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-8 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4  scrollbar-hide"
            >
              {catEvents.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/events/${r._id}`}
                    key={r._id}
                    data-index={idx}
                    className="carousel-card snap-center md:w-[270px] w-[200px] flex-shrink-0 shadow-md"
                  >
                    <img
                      src={img}
                      alt={r.name}
                      className="w-full md:h-[350px] h-[240px] object-cover rounded-2xl"
                    />
                    <div className="py-3">
                      <h2 className="font-semibold text-white md:text-lg text-[14px] mb-1">{r.name}</h2>
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
                          <span className="ml-2 md:text-sm text-[12px] text-white">
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
              {catEvents.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex[key] === idx ? "bg-[#AEFF53] w-5" : "bg-gray-300"
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
      {renderCarousel("Club & Nights Parties", "ClubNightsParties", ClubNightsPartiesRef)}
      {renderCarousel(
        "Live Music & Open Mic",
        "MusicOpenMic",
        MusicOpenMicRef
      )}

      {/* Green banner */}
      <div className="w-full h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>

      {renderCarousel("Creative Events", "CreativeEvents", CreativeEventsRef)}
      {renderCarousel("Social Nights", "SocialNights", SocialNightsRef)}
      {renderCarousel("Outdoor Night Events", "OutdoorNightEvents", OutdoorNightEventsRef)}

      {/* Green banner */}
      <div className="w-full h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>
    </div>
  );
};

export default NightLifeExplore;