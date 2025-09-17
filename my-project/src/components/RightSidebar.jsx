import React from "react";
import { Link } from "react-router-dom";


const RightSidebar = () => {
  return (
    <div className="w-[10%] fixed right-4 sm:right-[60px] top-[50px] flex flex-col gap-6 z-10 ">
  {[
    { title: "Restaurants", image: "/restaurant.jpg", link: "/restaurants" },
    { title: "Thrift Stores", image: "/stores.png", link: "/stores" },
    { title: "Events", image: "/Events.png", link: "/events" },
    { title: "Fun Things To Do", image: "/Activities.png", link: "/activities" },
    { title: "Places To Visit", image: "/Visit.png", link: "/places" },
  ].map((item, index) => (
    <Link key={index} to={item.link} className="relative w-[160px] group">
      <img
        src={item.image}
        alt={item.title}
        className="object-cover w-full h-[9vh] rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
      />
      <h3 className="flex justify-center text-[12px] sm:text-[12px] font-semibold text-black px-2 py-1 rounded">
        {item.title}
      </h3>
    </Link>
  ))}
</div>
  );
};

export default RightSidebar;
