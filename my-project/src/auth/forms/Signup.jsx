import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Signup = () => {
const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: "", // optional
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(formData);
      navigate("/"); // go home (now user is in context)
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-6 flex justify-center items-center">
      <div className="w-full h-[80vh] flex flex-row rounded-3xl shadow-2xl shadow-black overflow-hidden">
        {/* Left Side Panel */}
        <div className="hidden md:flex w-full justify-center items-center bg-[#FF0000]">
          <div className="flex flex-col justify-center items-center px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Welcome Back!
            </h1>
            <p className="text-base text-white/90 mt-2">
              Our experienced artist brings out your beauty with precision.
            </p>
            <Link
              to="/login"
              className="flex justify-center text-sm font-semibold bg-white mt-6 py-2 px-8 rounded-3xl hover:bg-white/90"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full flex flex-col justify-center items-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Create Account</h1>
          <div className="flex flex-row gap-4 mt-2">
            <FaInstagram className="text-[28px]" />
            <FaFacebook className="text-[28px]" />
          </div>
          <p className="text-base text-center w-[90%] md:w-[75%] mt-4">
            Our experienced artist brings out your beauty with precision.
          </p>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-5 space-y-4 w-full max-w-xs"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="mb-1 font-medium text-black">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username} // ✅ fixed
                onChange={handleChange}
                required
                autoComplete="username"
                className="border-2 border-black rounded-full py-2 px-5 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-1 font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email} // ✅ fixed
                onChange={handleChange}
                required
                autoComplete="email"
                className="border-2 border-black rounded-full py-2 px-5 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="mb-1 font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password} // ✅ fixed
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                className="border-2 border-black rounded-full py-2 px-5 focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-[#FF0000] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#AEFF53] transition-colors disabled:opacity-60"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

           {error && <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#FF0000] underline hover:text-[#AEFF53]"
            >
              Login
            </Link>
          </p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;