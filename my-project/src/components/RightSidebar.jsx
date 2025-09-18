import React from "react";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col gap-6 fixed right-4 lg:right-10 xl:right-16 top-20 w-[120px] sm:w-[160px] z-10">
      {[
        { title: "Restaurants", image: "/restaurant.jpg", link: "/restaurants" },
        { title: "Thrift Stores", image: "/stores.png", link: "/stores" },
        { title: "Events", image: "/Events.png", link: "/events" },
        { title: "Fun Things To Do", image: "/Activities.png", link: "/activities" },
        { title: "Places To Visit", image: "/Visit.png", link: "/places" },
      ].map((item, index) => (
        <Link key={index} to={item.link} className="relative group">
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-[80px] sm:h-[100px] rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <h3 className="flex justify-center text-xs sm:text-sm font-semibold text-white mt-1">
            {item.title}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default RightSidebar;