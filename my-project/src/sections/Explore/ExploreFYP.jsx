import React from "react";
import { Link } from "react-router-dom";

const ExploreFYP = () => {
  return (
    <div className="mt-[100px] px-6 md:px-[90px]">
      {/* Explore Categories */}
      <div>
        <h2 className="md:text-[30px] text-[20px] font-semibold mb-6">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-6">
          {[
            {
              title: "Restaurants",
              image: "/restaurant.jpg",
              link: "/restaurants",
            },
            { title: "Thrift Stores", image: "/stores.png", link: "/stores" },
            { title: "Events", image: "/Events.png", link: "/events" },
            {
              title: "Activities",
              image: "/Activities.png",
              link: "/activities",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              aria-label={`Go to ${item.title}`}
              className="relative rounded-2xl overflow-hidden shadow-lg group h-[200px] sm:h-[230px] lg:h-[200px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm">
                <h3 className="pl-4 py-4 text-white text-[14px] md:text-base font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Discover Section */} 
      <div className="mt-[100px] flex flex-col items-center text-center">
        <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold mb-6">
          Discover The Mother City
        </h2>
        <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[60%] font-medium text-sm sm:text-base leading-relaxed">
          Adventure Time is your go-to guide for exploring student life in Cape
          Town. Find the best restaurants, events, thrift stores, and hidden
          gems around the city — all in one place. Plan your adventures,
          discover local favorites, and connect with experiences that make
          student life unforgettable.
        </p>
      </div>
    </div>
  );
};

export default ExploreFYP;
