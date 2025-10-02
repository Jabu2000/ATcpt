import React from "react";

const ExploreFYP = () => {
  return (
    <div className="mt-[100px] px-6 md:px-[90px]">
      {/* Explore Categories */}
      <div>
        <h2 className="md:text-[30px] text-[20px] font-semibold mb-6">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "Restaurants", image: "/restaurant.jpg" },
            { title: "Thrift Stores", image: "/restaurant.jpg" },
            { title: "Events", image: "/restaurant.jpg" },
            { title: "Fun Things To Do", image: "/restaurant.jpg" },
            { title: "Places To Visit", image: "/restaurant.jpg" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg group h-[200px] sm:h-[230px] lg:h-[200px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm">
                <h3 className="pl-4 py-4 text-white text-lg md:text-base font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Section */}
      <div className="mt-[100px] flex flex-col items-center text-center">
        <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold mb-6">
          Discover The Mother City
        </h2>
        <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[44%] font-medium text-sm sm:text-base leading-relaxed">
          Built by a creative for creatives. Future artist and creatives.
          Painting the black and white world with color. Built by a creative for
          creatives. Future artist and creatives. Painting the black and white
          world with color. Built by a creative for creatives.
        </p>
      </div>
    </div>
  );
};

export default ExploreFYP;
