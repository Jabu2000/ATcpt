import React, { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RestaurantHero = () => {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const timeRunningRef = useRef(null);
  const nextTimeoutRef = useRef(null);
  const removeAnimTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/restaurants`);
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (restaurants.length === 0) return;

    resetTimeAnimation();
    startAutoNext();

    return () => {
      clearTimeout(nextTimeoutRef.current);
      clearTimeout(removeAnimTimeoutRef.current);
    };
  }, [restaurants]); // ✅ only run when restaurants change

  const startAutoNext = () => {
    clearTimeout(nextTimeoutRef.current);
    nextTimeoutRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  };

  const resetTimeAnimation = () => {
    const el = timeRunningRef.current;
    if (el) {
      el.style.animation = "none";
      // Trigger reflow
      void el.offsetHeight;
      el.style.animation = "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    if (!carousel || !list) return;

    const items = list.querySelectorAll(".item");
    if (items.length <= 1) return;

    if (type === "next") {
      list.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }

    clearTimeout(removeAnimTimeoutRef.current);
    removeAnimTimeoutRef.current = setTimeout(() => {
      carousel.classList.remove("next", "prev");
    }, timeRunning);

    resetTimeAnimation();
    startAutoNext();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        Loading restaurants...
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        No restaurants available
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className="carousel overflow-x-hidden relative" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {restaurants.map((restaurant) => (
            <div
              className="item bg-cover bg-center relative"
              key={restaurant._id}
              style={{ backgroundImage: `url(${restaurant.images?.[0] || restaurant.image || ""})` }}
            >
              <div className="content p-8 text-white">
                <h2 className="title w-[80%] 2xl:text-[150px] md:text-[100px] text-[50px] text-green-500 font-extrabold">
                  {restaurant.name}
                </h2>
                <div className="des w-[60%] text-[#FF0000] font-semibold">
                  {restaurant.cuisine} — {restaurant.address}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="timeRunning absolute bottom-0 left-0 h-[4px] bg-green-500"
          ref={timeRunningRef}
        ></div>
      </div>
    </div>
  );
};

export default RestaurantHero;