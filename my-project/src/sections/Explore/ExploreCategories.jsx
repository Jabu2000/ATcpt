import React from "react";
import RestaurantCategories from "../Restaurant/RestaurantCategories";
import FTTDCategories from "../FunThingsToDo/FTTDCategories";
import NightLifeCategories from "../NightLife/NightLifeCategories";
import StoreCategories from "../Stores/StoreCategories";

const ExploreCategories = () => {
  return (
    <div className="flex flex-col ">
      <RestaurantCategories />
      <FTTDCategories />
      <div className="w-full px-[50px]">
        {/* Green banner */}
        <div className="w-full h-[300px] bg-[#AEFF53]  mt-[80px] flex justify-center items-center rounded-2xl">
          <img alt="banner" />
        </div>
      </div>

      <NightLifeCategories />
      <StoreCategories />
      <div className="w-full px-[50px]">
        {/* Green banner */}
        <div className="w-full h-[300px] bg-[#AEFF53]  mt-[80px] flex justify-center items-center rounded-2xl">
          <img alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
