import React from "react";
import { Link } from "react-router-dom";

const HomeInfo = () => {
  return (
    <div className="flex flex-col px-6 md:px-[90px] md:mt-[100px] mt-[50px]">
      <div>
        {/* Heading */}
        <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold mb-6 text-left">
          Visit Other Cities
        </h2>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "JHB", image: "/JHB.png" },
            { title: "PTA", image: "/PTA.png" },
            { title: "BFT", image: "/BFT.png" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg group h-[200px] sm:h-[230px] lg:h-[250px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-full flex justify-center items-center bg-black/60 backdrop-blur-sm">
                <h3 className=" text-white text-[18px] sm:text-[22px] md:text-[30px] font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* Discover Section */}
        <div className="w-full mt-10 mb-[80px] flex flex-col items-center text-center gap-6">
          <h4 className="text-[20px] sm:text-[26px] text-gray-600 font-semibold leading-relaxed max-w-[800px]">
            Discover other cities in South Africa. Adventure Time is expanding
            to bring you the best experiences in Johannesburg, Pretoria, and
            Boemfontein. Stay tuned for more exciting updates!
          </h4>

          <div className="flex items-center justify-center border-[#FF0000] border-2 rounded-2xl px-6 sm:px-10 py-2 cursor-pointer hover:bg-[#FF0000] hover:text-white transition">
            <Link to="/about" className="grandstander-uniquifier font-semibold text-[12px] md:text-[14px]">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
