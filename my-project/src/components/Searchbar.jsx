import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex justify-center">
      {" "}
      <form
        onSubmit={handleSearch}
        className="flex px-2 py-2 items-center w-[80%] bg-white border border-[#808080] rounded-full shadow-md shadow-[#868686]"
      >
        <FaSearch className="ml-4 text-black font-light text-2xl transition duration-300 hover:scale-110 cursor-pointer" />

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Where, When..."
          className="w-full px-6 py-3 focus:outline-none "
        />
        <button
          type="submit"
          className="px-8 py-3 bg-[#aeff53]  hover:bg-[#78af39] text-black text-[14px] font-semibold rounded-full transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
