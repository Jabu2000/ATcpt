import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function AdventurePlanner({ onPlansChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    selectedDestination: null,
    date: "",
    images: "",
    rating: "",
  });
  const [plans, setPlans] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null); // new: track editing plan

  const [seedEvents, setEvents] = useState([]);
  const [seedPlaces, setPlaces] = useState([]);
  const [seedStores, setStores] = useState([]);
  const [seedRestaurants, setRestaurants] = useState([]);
  const [seedActivities, setActivities] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Notify parent when plans change
  useEffect(() => {
    if (onPlansChange) onPlansChange(plans);
  }, [plans, onPlansChange]);

  // Fetch data helper
  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`http://localhost:4000/api/${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close if the click is not on a dropdown button or menu
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedPlans = localStorage.getItem("adventurePlans");
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("adventurePlans", JSON.stringify(plans));
  // }, [plans]);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/adventures", {
          credentials: "include", // send cookies (if JWT in cookie)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT stored in localStorage
          },
        });
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch adventures:", err);
      }
    };

    fetchAdventures();
  }, []);

  useEffect(() => {
    fetchData("events", setEvents);
    fetchData("places", setPlaces);
    fetchData("stores", setStores);
    fetchData("restaurants", setRestaurants);
    fetchData("activities", setActivities);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) return setSearchResults([]);

    setIsSearching(true);
    const timer = setTimeout(() => {
      const combined = [
        ...seedEvents,
        ...seedPlaces,
        ...seedStores,
        ...seedRestaurants,
        ...seedActivities,
      ];
      const filtered = combined.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    seedEvents,
    seedPlaces,
    seedStores,
    seedRestaurants,
    seedActivities,
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectDestination = (item) => {
    setFormData((prev) => ({
      ...prev,
      destination: item.name,
      selectedDestination: item,
    }));
    setSearchQuery(item.name);
    setSearchResults([]);
  };

  // handle submit (create or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedDestination) return;

    try {
      const method = editIndex !== null ? "PUT" : "POST";
      const url =
        editIndex !== null
          ? `http://localhost:4000/api/adventures/${plans[editIndex]._id}`
          : "http://localhost:4000/api/adventures";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const newAdventure = await res.json();

      if (editIndex !== null) {
        setPlans((prev) =>
          prev.map((plan, i) => (i === editIndex ? newAdventure : plan))
        );
      } else {
        setPlans((prev) => [...prev, newAdventure]);
      }
    } catch (err) {
      console.error("Failed to save adventure:", err);
    }

    // reset
    setIsOpen(false);
    setEditIndex(null);
    setFormData({
      name: "",
      destination: "",
      selectedDestination: null,
      date: "",
      images: "",
      rating: "",
    });
    setSearchQuery("");
    setSearchResults([]);
  };

  // handle delete
  const handleDelete = async (index) => {
    try {
      await fetch(`http://localhost:4000/api/adventures/${plans[index]._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPlans((prev) => prev.filter((_, i) => i !== index));
      setDeleteIndex(null);
    } catch (err) {
      console.error("Failed to delete adventure:", err);
    }
  };

  const handleEdit = (index) => {
    const plan = plans[index];
    setFormData({ ...plan });
    setEditIndex(index);
    setIsOpen(true);
    setDropdownOpen(null);
    setSearchQuery(plan.destination);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Create Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Create Adventure Plan
      </button>

      {/* Plans List */}
      <div className="mt-6 max-h-96 overflow-y-auto space-y-4">
        {plans.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No adventure plans yet.
          </p>
        )}

        {plans.map((plan, index) => {
          const dest = plan.selectedDestination;
          return (
            <div
              key={index}
              className="relative flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200"
            >
              {/* Dropdown */}
              <div className="absolute top-2 right-2 dropdown-container">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === index ? null : index)
                  }
                  className="text-gray-400 hover:text-gray-700"
                >
                  ⋮
                </button>

                {dropdownOpen === index && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => handleEdit(index)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteIndex(index)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Image */}
              {dest?.images?.[0] ? (
                <img
                  src={dest.images[0]}
                  alt={dest.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{dest?.name}</p>
                  <p className="text-sm text-gray-600">Date: {plan.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteIndex !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteIndex(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg w-80 max-w-full text-center">
                <h3 className="text-lg font-bold mb-4">Delete</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to delete this plan?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteIndex(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteIndex)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  setEditIndex(null);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">
                {editIndex !== null
                  ? "Edit Adventure Plan"
                  : "Create Adventure Plan"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Adventure Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Adventure Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Destination Search */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Destination
                  </label>
                  <input
                    type="search"
                    name="destination"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations..."
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery.trim() && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-64 overflow-y-auto shadow-lg">
                      {isSearching ? (
                        <li className="p-3 text-center text-gray-500">
                          Searching...
                        </li>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <li
                            key={item._id}
                            onClick={() => handleSelectDestination(item)}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                          >
                            <img
                              src={item?.images?.[0] || "/placeholder.jpg"}
                              alt={item?.name || "Destination"}
                              className="w-12 h-12 object-cover rounded-md mr-3"
                            />
                            <div>
                              <p className="font-semibold">{item?.name}</p>
                              <p className="text-sm text-gray-500">
                                {item?.address}
                              </p>
                              {typeof item?.rating === "number" && (
                                <div className="flex items-center gap-1 text-[#FAA500]">
                                  {Array.from({ length: 5 }, (_, i) => {
                                    const starValue = i + 1;
                                    if (item.rating >= starValue)
                                      return <FaStar key={i} />;
                                    if (item.rating >= starValue - 0.5)
                                      return <FaStarHalfAlt key={i} />;
                                    return <FaRegStar key={i} />;
                                  })}
                                  <span className="ml-2 text-sm text-black">
                                    {item.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="p-3 text-center text-gray-500">
                          No results found
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
                >
                  {editIndex !== null ? "Save Changes" : "Save Adventure"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
