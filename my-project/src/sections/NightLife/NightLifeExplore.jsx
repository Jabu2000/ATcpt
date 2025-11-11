import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

const NightLifeExplore = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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

  const images = [
    "/eventspost1.png",
    "/eventspost2.png",
    "/eventspost3.png",
    "/eventspost4.png",
    "/eventspost5.png",
  ];

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
        <h2 className="md:text-[30px] text-[20px] text-black font-semibold">
          {title}
        </h2>
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
    <div className="flex flex-col px-4 md:px-[100px] my-[50px]">
      {renderCarousel(
        "Club & Nights Parties",
        "ClubNightsParties",
        ClubNightsPartiesRef
      )}

      {/* Green banner */}
      <div className="relative w-full h-[500px] mt-[80px] rounded-2xl overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="/eventvid.MP4"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        {/* Optional overlay text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
            Explore Nightlife Like Never Before
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Discover the best clubs, events, and nightlife experiences in Cape
            Town. Your ultimate guide to unforgettable nights out.
          </p>
        </div>
      </div>
      {renderCarousel("Live Music & Open Mic", "MusicOpenMic", MusicOpenMicRef)}
      {renderCarousel("Creative Events", "CreativeEvents", CreativeEventsRef)}
      {renderCarousel("Social Nights", "SocialNights", SocialNightsRef)}

      {/* Green banner */}
      <div className="w-full md:h-full h-[600px] mt-[80px] flex justify-center items-center rounded-2xl">
        <img
          src={images[currentIndex]}
          alt="banner"
          className={`w-full h-full md:object-cover rounded-2xl transition-opacity duration-500 md:hidden flex ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        <img
          src="/eventspost3.png"
          alt="banner"
          className="w-full h-full object-cover rounded-2xl md:flex hidden"
        />
      </div>
    </div>
  );
};

export default NightLifeExplore;
