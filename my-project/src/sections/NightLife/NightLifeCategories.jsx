import { useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NightLifeCategories = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const data = new Array(10).fill({
    image: "/restaurant.jpg",
    title: "Discover The Mother City Built by a creative for creatives.",
  });

  const data1 = new Array(10).fill({
    image: "/restaurant.jpg",
    title: "Discover The Mother City Built by a creative for creatives.",
  });

  const data2 = new Array(10).fill({
    image: "/restaurant.jpg",
    title: "Discover The Mother City Built by a creative for creatives.",
  });

  const data3 = new Array(10).fill({
    image: "/restaurant.jpg",
    title: "Discover The Mother City Built by a creative for creatives.",
  });

  return (
    <div className="flex flex-col mt-[100px] px-[80px] gap-[100px]">
      <div className="flex flex-col ">
        <div className="flex flex-col">
          <h2 className="text-[30px] font-semibold">You Might Like These</h2>
          <p className="text-[16px] font-normal">
            More things to do in Cape Town
          </p>
        </div>
        <div className="relative mt-8  ">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-hidden no-scrollbar scroll-smooth"
          >
            <div className="flex gap-6 py-2 w-max">
              {data.map((item, index) => (
                <div key={index} className="min-w-[250px] max-w-[275px] ">
                  <img
                    src={item.image}
                    alt="card"
                    className="w-full h-[45vh] object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-md mb-2">{item.title}</h3>
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-100% h-[500px] bg-[#AEFF53] flex justify-center items-center rounded-2xl">
        <img />
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-col">
          <h2 className="text-[30px] font-semibold">You Might Like These</h2>
          <p className="text-[16px] font-normal">
            More things to do in Cape Town
          </p>
        </div>
        <div className="relative mt-8  ">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-hidden no-scrollbar scroll-smooth"
          >
            <div className="flex gap-6 py-2 w-max">
              {data1.map((item, index) => (
                <div key={index} className="min-w-[250px] max-w-[275px] ">
                  <img
                    src={item.image}
                    alt="card"
                    className="w-full h-[45vh] object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-md mb-2">{item.title}</h3>
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-col">
          <h2 className="text-[30px] font-semibold">You Might Like These</h2>
          <p className="text-[16px] font-normal">
            More things to do in Cape Town
          </p>
        </div>
        <div className="relative mt-8  ">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-hidden no-scrollbar scroll-smooth"
          >
            <div className="flex gap-6 py-2 w-max">
              {data2.map((item, index) => (
                <div key={index} className="min-w-[250px] max-w-[275px] ">
                  <img
                    src={item.image}
                    alt="card"
                    className="w-full h-[45vh] object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-md mb-2">{item.title}</h3>
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-col">
          <h2 className="text-[30px] font-semibold">You Might Like These</h2>
          <p className="text-[16px] font-normal">
            More things to do in Cape Town
          </p>
        </div>
        <div className="relative mt-8  ">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-hidden no-scrollbar scroll-smooth"
          >
            <div className="flex gap-6 py-2 w-max">
              {data3.map((item, index) => (
                <div key={index} className="min-w-[250px] max-w-[275px] ">
                  <img
                    src={item.image}
                    alt="card"
                    className="w-full h-[45vh] object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-md mb-2">{item.title}</h3>
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-100% h-[300px] bg-[#AEFF53] flex justify-center items-center rounded-2xl">
        <img />
      </div>

      <div className="w-100% h-[500px] bg-[#AEFF53] flex justify-center items-center rounded-2xl">
        <img />
      </div>
    </div>
  );
};

export default NightLifeCategories;
