import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const StoresHero = () => {
  const [seedStores, setSeedStores] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Carousel Refs ---
  const vintageRef = useRef(null);
  const comicRef = useRef(null);
  const handmadeRef = useRef(null);
  const bookstoresRef = useRef(null);
  const marketsRef = useRef(null);
  const musicRef = useRef(null);

  // Fetch stores from backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/stores");
        const data = await res.json();
        setSeedStores(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, []);

  const [activeIndex, setActiveIndex] = useState({
    Vintage: 0,
    Comic: 0,
    Handmade: 0,
    Bookstores: 0,
    Markets: 0,
    Music: 0,
  });

  // --- Slideshow ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        seedStores.length > 0 ? (prev + 1) % seedStores.length : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [seedStores]);

  // --- Fetch stores ---
  const fetchStores = async (q = "") => {
    try {
      setLoading(true);
      const url = q
        ? `${API_URL}/api/stores?q=${encodeURIComponent(q)}`
        : `${API_URL}/api/stores`;
      const res = await fetch(url);
      const data = await res.json();
      setStores(data);

      // 👇 pick first image per category for hero slider
      const categories = [
        "Vintage",
        "Comic",
        "Handmade",
        "Bookstores",
        "Markets",
        "Music",
      ];

      const catImages = categories
        .map((cat) => {
          const store = data.find(
            (a) => a.category === cat && a.images?.[0]
          );
          return store ? store.images[0] : null;
        })
        .filter(Boolean);

      setSeedStores(catImages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores(); // fetch all on mount
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
    stores.filter(
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
      observeCarousel(vintageRef, "Vintage"),
      observeCarousel(comicRef, "Comic"),
      observeCarousel(handmadeRef, "Handmade"),
      observeCarousel(bookstoresRef, "Bookstores"),
      observeCarousel(marketsRef, "Markets"),
      observeCarousel(musicRef, "Music"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [stores]);

  // --- Reusable carousel ---
  const renderCarousel = (title, key, ref) => {
    const catStores = filterByCategory(key);

    return (
      <div className="flex flex-col 2xl:mt-[150px] mt-[50px]">
        <h2 className="md:text-[30px] text-[20px] text-white font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catStores.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-8 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4  scrollbar-hide"
            >
              {catStores.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/stores/${r._id}`}
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

            {/* Scroll buttons */}
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

            {/* Indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {catStores.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex[key] === idx ? "bg-[#AEFF53] w-5" : "bg-[#ffffff]"
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
          {seedStores.map((src, index) => (
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
              Find New Places
            </h2>
            <div className="flex px-2 py-1 md:py-2 md:px-1 justify-center items-center w-full md:w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686]">
              <FaSearch className="ml-4 text-black font-light md:text-3xl text-2xl transition duration-300 hover:scale-110 cursor-pointer" />
              <input
                type="text"
                placeholder="Search by name, cuisine, or area"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 focus:outline-none"
              />
              <button
                onClick={() => fetchStores(search)}
                type="submit"
                className="px-6 md:py-3 py-2 bg-[#aeff53] hover:bg-[#78af39] text-black text-[14px] font-semibold rounded-full transition"
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
          "Vintage & Retro Thrift Stores",
          "Vintage",
          vintageRef
        )}

        <div className="w-100% h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
          <img />
        </div>

        {renderCarousel("Comic & Collectible Shops", "Comic", comicRef)}
        {renderCarousel("Handmade & Artisan Shops", "Handmade", handmadeRef)}
        {renderCarousel("Bookstores & Stationery Shops", "Bookstores", bookstoresRef)}
        {renderCarousel("Markets & Pop-Up Thrift Events Experiences", "Markets", marketsRef)}
        {renderCarousel("Fun with Music & Vinyl Stores", "Music", musicRef)}

        <div className="w-100% h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
          <img />
        </div>
      
      </div>
    </>
  );
};

export default StoresHero;
