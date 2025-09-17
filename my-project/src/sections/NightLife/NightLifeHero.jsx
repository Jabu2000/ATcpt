import React from "react";
import Searchbar from "../../components/Searchbar";

const NightLifeHero = () => {
  return (
    <div
      className="relative w-full h-[100vh] bg-cover bg-center flex items-center "
      style={{ backgroundImage: "url(/Events.png)" }}
    >
      <div className="w-[60%]">
        <h1 className="flex items-center pl-[80px] text-white leading-[120px] font-extrabold text-[60px] sm:text-[100px] xl:text-[130px]">
          Night Life And Events
        </h1>
        <p className="w-[90%] pl-[80px] text-[16px] mb-8 text-white">
          Built by a creative for creatives. Future artist and creatives.
          Painting the black and white world with color Built by a creative for
          creatives. Future artist and creatives. Painting the black and white
          world with color Built by a creative for creatives.
        </p>
        <Searchbar onSearch={(query) => console.log("Searching for:", query)} />
      </div>
    </div>
  );
};

export default NightLifeHero;
