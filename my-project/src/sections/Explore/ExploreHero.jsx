import React from "react";
import Searchbar from "../../components/Searchbar";

const ExploreHero = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // You can filter data or make API calls here
  };

  return (
    <div className="px-[80px] pt-[120px]">
      <h1 className="flex justify-center text-black text-center leading-none font-extrabold 2xl:mt-[100px] mt-[60px] text-[60px] sm:text-[100px] xl:text-[150px]">
        Adventure Time
      </h1>
      <div className="flex flex-col justify-center">
        <h2 className="text-[36px] font-semibold text-center mb-2">
          Things To Do In Cape Town
        </h2>
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="mt-[100px]">
        <h2 className="text-[30px] font-bold mb-6">Featured Sections</h2>
        <div className="flex flex-row gap-6">
          <div className="flex justify-center items-center rounded-lg">
            <img src="/restaurant.jpg" className="rounded-2xl" />
            <h3 className="text-white text-[20px] font-semibold absolute">
              Top Adventures
            </h3>
          </div>
          <div className="flex justify-center items-center rounded-lg">
            <img src="/restaurant.jpg" className="rounded-2xl" />
            <h3 className="text-white text-[20px] font-semibold absolute">
              Upcoming Events
            </h3>
          </div>
          <div className="flex justify-center items-center rounded-lg">
            <img src="/restaurant.jpg" className="rounded-2xl" />
            <h3 className="text-white text-[20px] font-semibold absolute">
              Spots
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHero;
