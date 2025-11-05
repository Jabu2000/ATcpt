import React from "react";
import RestaurantCategories from "../Restaurant/RestaurantCategories";
import FTTDCategories from "../FunThingsToDo/FTTDCategories";
import NightLifeCategories from "../NightLife/NightLifeCategories";
import StoreCategories from "../Stores/StoreCategories";

const ExploreCategories = () => {
  return (
    <div className="flex flex-col px-6 md:px-[40px]">
      <RestaurantCategories />
      <FTTDCategories />
      <div className="w-full md:px-[50px]">
        {/* Green banner */}
        <div className="relative w-full h-[500px] mt-[80px] rounded-2xl overflow-hidden">
          <img src="/explorepost.png" alt="banner" className="w-full h-full object-cover rounded-2xl"/>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
            Plan the perfect date
          </h2>
        </div>
        </div>
      </div>

      <NightLifeCategories />
      <StoreCategories />
      <div className="w-full md:px-[50px]">
        {/* Green banner */}
        <div className="relative w-full h-[500px] mt-[80px] rounded-2xl overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="/explorevid.MP4"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        {/* Optional overlay text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-3">
            Explore different coffee spots the Mother City has to offer
          </h2>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ExploreCategories;
