import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/"); // user is now in context
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-full h-screen p-6 flex justify-center items-center">
      <div className="w-full h-[80vh] flex flex-row rounded-3xl shadow-2xl shadow-black overflow-hidden">
        {/* Login Form */}
        <div className="w-full flex flex-col justify-center items-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Sign In</h1>
          <div className="flex flex-row gap-4 mt-2">
            <FaInstagram className="text-[28px]" />
            <FaFacebook className="text-[28px]" />
          </div>
          <p className="text-base text-center w-[90%] md:w-[80%] mt-4">
            Our experienced artist brings out your beauty with precision.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-5 space-y-4 w-full max-w-xs"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-1 font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="border-2 border-black rounded-full py-2 px-5 focus:outline-none focus:border-[#AEFF53] focus:ring-1 focus:ring-[#AEFF53]"
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
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="border-2 border-black rounded-full py-2 px-5 focus:outline-none focus:border-[#AEFF53] focus:ring-1 focus:ring-[#AEFF53]"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-[#AEFF53] text-black font-semibold py-2 px-8 rounded-full hover:bg-[#FF0000] hover:text-white transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#AEFF53] underline hover:text-[#FF0000]"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side Panel */}
        <div className="hidden md:flex w-full justify-center items-center bg-[#AEFF53]">
          <div className="flex flex-col justify-center items-center px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold">Hello!</h1>
            <p className="text-base">
              Our experienced artist brings out your beauty with precision.
            </p>
            <Link
              to="/signup"
              className="flex justify-center text-sm font-semibold bg-white mt-6 py-2 px-8 rounded-3xl hover:bg-white/90"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;