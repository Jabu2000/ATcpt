import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { title: "Restaurants", image: "/restaurant.jpg", link: "/restaurants" },
  { title: "Stores", image: "/stores.png", link: "/stores" },
  { title: "Events", image: "/Events.png", link: "/events" },
  { title: "Activities", image: "/Activities.png", link: "/activities" },
];

const RightSidebar = () => {
  return (
    <aside className="right-0 hidden lg:flex flex-col absolute items-end pt-12 pr-8 gap-6 ">
      {categories.map(({ title, image, link }, index) => (
        <Link
          key={index}
          to={link}
          aria-label={`Go to ${title}`}
          className="w-[160px] relative group flex flex-col items-center"
        >
          <img
            src={image}
            alt={`${title} thumbnail`}
            className="object-cover w-full h-[80px] sm:h-[100px] rounded-2xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition duration-300"
          />
          <h3 className="mt-1 text-center text-xs sm:text-sm font-semibold text-black truncate w-full">
            {title}
          </h3>
        </Link>
      ))}
    </aside>
  );
};

export default RightSidebar;