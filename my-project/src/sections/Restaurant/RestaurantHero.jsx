import React, { useEffect, useRef, useState } from "react";

const RestaurantHero = () => {
  const [seedRestaurant, setSeedRestaurant] = useState([]);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const timeRunningRef = useRef(null);
  const nextTimeoutRef = useRef(null);
  const removeAnimTimeoutRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/restaurants");
        const data = await res.json();
        setSeedRestaurant(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    resetTimeAnimation();
    startAutoNext();

    return () => {
      clearTimeout(nextTimeoutRef.current);
      clearTimeout(removeAnimTimeoutRef.current);
    };
  });

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
      el.offsetHeight; // Trigger reflow
      el.style.animation = "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    const items = list.querySelectorAll(".item");

    if (type === "next") {
      list.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }

    clearTimeout(removeAnimTimeoutRef.current);
    removeAnimTimeoutRef.current = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, timeRunning);

    resetTimeAnimation();
    startAutoNext();
  };

  return (
    <div className="overflow-x-hidden">
      <div className="carousel overflow-x-hidden" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {seedRestaurant.map((restaurant) => (
            <div
              className="item"
              key={restaurant._id} // ✅ use MongoDB id
              style={{ backgroundImage: `url(${restaurant.images})` }}
            >
              <div className="content">
                <h2 className="title  w-[80%] 2xl:text-[150px] md:text-[100px] text-[50px] text-[#AEFF53] font-extrabold">
                  {restaurant.name}
                </h2>
                <div className="des w-[60%] text-[#FF0000] font-semibold">
                  {restaurant.cuisine} — {restaurant.address}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="timeRunning" ref={timeRunningRef}></div>
      </div>
    </div>
  );
};

export default RestaurantHero;
