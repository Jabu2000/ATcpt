import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import HomeExplore from "./HomeExplore";

const HomeHero = () => {
   const handleSearch = (query) => {
        console.log("Searching for:", query);
        // You can filter data or make API calls here
    }

  return (
    <div className="w-full flex justify-between px-4 sm:px-[60px] ">
      <div className="fixed left-4 sm:left-[60px] top-[50px] flex flex-col gap-6 ">
        <img
          src="/paperplan.png"
          alt="Explore Hero"
          className="w-[40px] sm:w-[50px]"
        />

        <div className="flex flex-col gap-4">
          {[
            "Home",
            "Search",
            "Explore",
            "Adventures",
            "Saved Adventures",
            "Profile",
          ].map((text, index) => (
            <Link
              to="/"
              key={index}
              className="text-black text-[16px] sm:text-[20px] font-semibold grandstander-uniquifier hover:underline"
            >
              {text}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-[100px] w-full ">
        <h1 className="text-black text-center leading-none font-extrabold text-[48px] sm:text-[80px] xl:text-[100px]">
          Adventure Time
        </h1>
        <div className="flex flex-col mt-8 items-center">
          <h2 className="text-[24px] sm:text-[30px] font-semibold text-center mb-2">
            Things To Do In Cape Town
          </h2>
          <div className="w-full max-w-[600px]">
            <Searchbar onSearch={handleSearch} />
          </div>
        </div>
        <HomeExplore />
      </div>

      <div className="w-[120px] fixed right-4 sm:right-[60px] top-[50px] flex flex-col gap-6 z-10 ">
        {[
          { title: "Restaurants", image: "/restaurant.jpg" },
          { title: "Thrift Stores", image: "/stores.png" },
          { title: "Events", image: "/Events.png" },
          { title: "Fun Things To Do", image: "/Activities.png" },
          { title: "Places To Visit", image: "/Visit.png" },
        ].map((item, index) => (
          <div key={index} className="relative w-full">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-[12vh] rounded-2xl shadow-lg"
            />
            <h3 className="absolute bottom-2  text-white text-[12px] sm:text-[12px] font-semibold bg-black bg-opacity-60 px-2 py-1 rounded">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHero;
