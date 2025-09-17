import React from "react";

const ExploreFYP = () => {

  return (
    
    <div className="px-[80px]">
      <div className="mt-[100px]">
        <h2 className="text-[30px] font-semibold mb-6">Explore Categories</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { title: "Restaurants", image: "/restaurant.jpg" },
            { title: "Thrift Stores", image: "/restaurant.jpg" },
            { title: "Events", image: "/restaurant.jpg" },
            { title: "Fun Things To Do", image: "/restaurant.jpg" },
            { title: "Place To Visit", image: "/restaurant.jpg" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[48%] lg:w-[18.3%] h-[47vh] rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute w-full bottom-0 rounded-b-lg bg-[#000000b6] backdrop-blur-[2px]">
                <h3 className="pl-4 py-4 text-white text-xl md:text-[16px] font-semibold bg drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[100px]">
        <h2 className="text-[40px] font-bold mb-6 text-center">
          Discover The Mother City
        </h2>
        <p className="w-[44%] font-medium">
          Built by a creative for creatives. Future artist and creatives.
          Painting the black and white world with color Built by a creative for
          creatives. Future artist and creatives. Painting the black and white
          world with color Built by a creative for creatives.
        </p>
      </div>
    </div>
  );
};

export default ExploreFYP;
