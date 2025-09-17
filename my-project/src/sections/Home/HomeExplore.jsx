import Searchbar from "../../components/Searchbar";
import { FaStar } from "react-icons/fa";

const HomeExplore = () => {
  return (
    <div className="flex flex-col items-center mt-[50px] gap-[60px] py-2">
      <div className="2xl:w-[500px] xl:w-[400px]  w-[250px]">
        <img
          src="/restaurant.jpg"
          alt="card"
          className="w-full 2xl:h-[90vh] xl:h-[90vh] object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold text-md mb-2">
          Discover The Mother City Built by a creative for creatives.
        </h3>
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      <div className="2xl:w-[500px] xl:w-[400px] w-[250px]">
        <img
          src="/restaurant.jpg"
          alt="card"
          className="w-full 2xl:h-[90vh] xl:h-[90vh] object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold text-md mb-2">
          Discover The Mother City Built by a creative for creatives.
        </h3>
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeExplore;
