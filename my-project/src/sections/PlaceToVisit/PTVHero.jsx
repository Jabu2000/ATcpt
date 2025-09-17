import React from "react";
import Searchbar from "../../components/Searchbar";

const PTVHero = () => {
  return (
    <div
      className="relative w-full h-[100vh] bg-cover bg-center flex justify-center flex-col items-center "
      style={{ backgroundImage: "url(/Visit.png)" }}
    >
      <h1 className="w-[50%] text-center flex items-center pl-[80px] text-white leading-[120px] font-extrabold text-[60px] sm:text-[100px] xl:text-[130px]">
        Places To Visit
      </h1>
      <p className="w-[60%] pl-[80px] text-[16px] mb-8 text-center text-white">
        Built by a creative for creatives. Future artist and creatives. Painting
        the black and white world with color Built by a creative for creatives.
        Future artist and creatives. Painting the black and white world with
        color Built by a creative for creatives.
      </p>
      <div className="w-[80%]">
        <Searchbar onSearch={(query) => console.log("Searching for:", query)} />
      </div>
    </div>
  );
};

export default PTVHero;
