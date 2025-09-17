import React from "react";

const HomeInfo = () => {
  return (
    <div className="flex flex-col px-[80px] mt-[100px]">
      <h2 className="text-[30px] font-bold mb-6">Visit Other Cities</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { title: "JHB", image: "/restaurant.jpg" },
          { title: "PTA", image: "/restaurant.jpg" },
          { title: "BFT", image: "/restaurant.jpg" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[48%] lg:w-[31.6%] h-[47vh] rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute w-full bottom-0 ">
              <h3 className="pl-[50px] py-4 text-white text-[16px] md:text-[30px] font-semibold bg drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
        <div className="w-full mt-10 mb-[80px] gap-4 sm:w-[48%] lg:w-[62%] flex flex-col justify-center items-center ">
          <h4 className="text-[32px] font-semibold text-center ">
            Discover The Mother City Built by a creative for creatives. Future
            artist and creatives. White world with color Built by a creative for
            creatives.
          </h4>
          <div className="flex items-center justify-between max-w-full border-[#2f9715] border-2 rounded-full px-[40px] py-2 ">
            <a className="grandstander-uniquifier font-semibold text-[14px] sm:text-[16px]">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
