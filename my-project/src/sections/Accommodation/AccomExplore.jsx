import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AccomExplore = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  const SupportResidencesRef = useRef(null);
  const PrivateSingleRef = useRef(null);
  const SharedHousesApartmentsRef = useRef(null);
  const PrivateStudentComplexesRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState({
    SupportResidences: 0,
    PrivateSingle: 0,
    SharedHousesApartments: 0,
    PrivateStudentComplexes: 0,
  });

  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/accommodations`);
      const data = await res.json();
      setAccommodations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations();
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
    accommodations.filter((r) => r.category === category);

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
      observeCarousel(SupportResidencesRef, "SupportResidences"),
      observeCarousel(PrivateSingleRef, "PrivateSingle"),
      observeCarousel(SharedHousesApartmentsRef, "SharedHousesApartments"),
      observeCarousel(PrivateStudentComplexesRef, "PrivateStudentComplexes"),
    ];
    return () => cleanups.forEach((c) => c && c());
  }, [accommodations]);

  const renderCarousel = (title, key, ref) => {
    const catAccommodations = filterByCategory(key);

    return (
      <div className="flex flex-col mt-[50px]">
        <h2 className="text-[30px] font-semibold">{title}</h2>
        {loading ? (
          <p className="text-gray-500 mt-2">Loading {title.toLowerCase()}…</p>
        ) : catAccommodations.length === 0 ? (
          <p className="text-gray-500 mt-2">No {title.toLowerCase()} found.</p>
        ) : (
          <div className="relative group mt-6">
            <div
              ref={ref}
              className="flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory pb-4 px-2 scrollbar-hide"
            >
              {catAccommodations.map((r, idx) => {
                const img =
                  r.images?.[0] || "https://placehold.co/600x400?text=Image";
                return (
                  <Link
                    to={`/accommodation/${r._id}`}
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
              {catAccommodations.map((_, idx) => (
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
      {renderCarousel("Support Residences", "SupportResidences", SupportResidencesRef)}
      {renderCarousel(
        "Private Single or Studio Apartments",
        "PrivateSingle",
        PrivateSingleRef
      )}

      {/* Green banner */}
      <div className="w-full h-[500px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>

      {renderCarousel("Shared Houses / Apartments", "SharedHousesApartments", SharedHousesApartmentsRef)}
      {renderCarousel("Private Student Complexes", "PrivateStudentComplexes", PrivateStudentComplexesRef)}

      {/* Green banner */}
      <div className="w-full h-[300px] bg-[#AEFF53] mt-[80px] flex justify-center items-center rounded-2xl">
        <img alt="banner" />
      </div>
    </div>
  );
};

export default AccomExplore;