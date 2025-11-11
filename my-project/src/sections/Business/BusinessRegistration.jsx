import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

const BusinessRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    businessName: "",
    location: "",
    contactNumber: "",
    description: "",
    operationHours: "",
    googleRating: "",
    category: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "/login" : "/register";
      const res = await axios.post(`${API_URL}${endpoint}`, {
        ...formData,
        // ensure numeric value for rating if provided
        googleRating: formData.googleRating
          ? parseFloat(formData.googleRating)
          : null,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("business", JSON.stringify(res.data.business));
      navigate("/business-profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coming Soon
        </h2>
        <p className="text-lg md:text-xl text-gray-200 text-center max-w-md">
          Our Business Portal is almost ready! Stay tuned for launch.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#FF0000] mb-2">
          Adventure Time Business Portal
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {isLogin
            ? "Log in to manage your business profile"
            : "Create your business profile to be featured on Adventure Time"}
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              isLogin
                ? "bg-[#FF0000] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              !isLogin
                ? "bg-[#FF0000] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Create Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isLogin ? (
            <>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-semibold mb-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Cape Town, Waterfront"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  type="tel"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., +27 82 123 4567"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Describe your business..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Operation Hours & Days
                </label>
                <input
                  name="operationHours"
                  value={formData.operationHours}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Mon–Fri: 9AM–6PM, Sat: 10AM–4PM"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Google Rating
                </label>
                <input
                  name="googleRating"
                  value={formData.googleRating}
                  onChange={handleChange}
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 4.7"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="store">Store</option>
                  <option value="event">Event</option>
                  <option value="activity">Activity</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Account Setup
                </h3>
                <div>
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-3">
                  <label className="block mb-1 font-semibold">Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter a password"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF0000] hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Please wait..." : isLogin ? "Log In" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessRegistration;
