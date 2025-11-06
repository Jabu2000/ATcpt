import React, { useState, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import gsap from "gsap";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Separate refs for desktop + mobile
  const signupFormDesktopRef = useRef(null);
  const redPanelDesktopRef = useRef(null);

  const signupFormMobileRef = useRef(null);
  const redPanelMobileRef = useRef(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Animate desktop forms
  useEffect(() => {
    if (!signupFormDesktopRef.current || !redPanelDesktopRef.current) return;

    if (!isLogin) {
      gsap.to(redPanelDesktopRef.current, {
        x: "-200%",
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(signupFormDesktopRef.current, {
        x: "-100%",
        duration: 1.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(redPanelDesktopRef.current, {
        x: "0%",
        duration: 1.2,
        ease: "power3.in",
      });
      gsap.to(signupFormDesktopRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power3.in",
      });
    }
  }, [isLogin]);

  // Animate mobile forms
  useEffect(() => {
    if (!signupFormMobileRef.current || !redPanelMobileRef.current) return;

    if (!isLogin) {
      gsap.to(signupFormMobileRef.current, {
        x: "0%",
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(redPanelMobileRef.current, {
        x: "-100%",
        duration: 1.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(signupFormMobileRef.current, {
        x: "100%",
        duration: 1.2,
        ease: "power3.in",
      });
      gsap.to(redPanelMobileRef.current, {
        x: "0%",
        duration: 1.2,
        ease: "power3.in",
      });
    }
  }, [isLogin]);

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      {/* ===== DESKTOP VIEW ===== */}
      <div className="relative w-full max-w-5xl h-auto md:h-[550px] bg-white shadow-2xl rounded-3xl overflow-hidden hidden md:flex flex-col md:flex-row">
        {/* --- Login Section --- */}
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-10 md:py-0 relative z-40">
            <h1 className="text-3xl md:text-4xl font-bold">Sign In</h1>
            {/* <div className="flex gap-3 mt-2">
              <FaInstagram className="text-xl" />
              <FaFacebook className="text-xl" />
            </div> */}
            <p className="text-sm text-center mt-4 w-[85%]">
              Our experienced artist brings out your beauty with precision.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-5 space-y-4 w-full max-w-xs"
            >
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="border-2 border-black rounded-2xl py-2 px-5 focus:border-green-500 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="border-2 border-black rounded-2xl py-2 px-5 focus:border-green-500 focus:outline-none"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto text-xs md:text-sm font-semibold bg-green-500 hover:bg-green-600 
          text-white rounded-2xl py-2 px-6 md:px-10 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Right Side Panel */}
          <div
            ref={redPanelDesktopRef}
            className="hidden md:flex w-1/2 justify-center items-center bg-green-500 z-30"
            style={{ transform: "translateX(100%)" }}
          >
            <div className="flex flex-col justify-center items-center px-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Hello!</h1>
              <p className="text-sm text-white">
                Our experienced artist brings out your beauty with precision.
              </p>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="flex justify-center text-xs md:text-sm font-semibold bg-white hover:bg-[#FF0000] text-black hover:text-white mt-6 py-2 px-8 rounded-2xl "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Red Panel (underneath) */}
        <div
          ref={signupFormDesktopRef}
          className="absolute top-0 right-0 w-1/2 h-full bg-[#FF0000] text-white z-[50]"
          style={{ transform: "translateX(100%)" }}
        >
          <div className="flex flex-col justify-center items-center h-full px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Welcome Back!</h1>
            <p className="text-sm text-white/90 mt-2">
              Our experienced artist brings out your beauty with precision.
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="flex justify-center text-xs md:text-sm font-semibold text-black hover:text-white bg-white hover:bg-green-500 mt-6 py-2 px-8 rounded-2xl "
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center px-6 py-10 md:py-0 z-[20]">
          <h1 className="text-3xl md:text-4xl font-bold">Create Account</h1>
          {/* <div className="flex gap-3 mt-2">
            <FaInstagram className="text-xl" />
            <FaFacebook className="text-xl" />
          </div> */}
          <p className="text-sm text-center mt-4 w-[85%]">
            Our experienced artist brings out your beauty with precision.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 space-y-4 w-full max-w-xs"
          >
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="border-2 border-black rounded-2xl py-2 px-5 focus:border-[#FF0000] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border-2 border-black rounded-2xl py-2 px-5 focus:border-[#FF0000] focus:outline-none"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength={6}
              className="border-2 border-black rounded-2xl py-2 px-5 focus:border-[#FF0000] focus:outline-none"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto text-xs md:text-sm font-semibold bg-[#FF0000] hover:bg-red-400 
          text-white rounded-2xl py-2 px-6 md:px-10 transition"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== MOBILE VIEW ===== */}
      <div className="relative w-full max-w-5xl h-auto md:h-[550px] bg-white shadow-2xl rounded-3xl overflow-hidden md:hidden flex flex-col md:flex-row">
        {/* Login Section */}
        <div
          ref={redPanelMobileRef}
          className="w-full bg-white flex flex-col justify-center items-center px-6 py-10 relative z-40"
          style={{ transform: "translateX(0%)" }}
        >
          <h1 className="text-3xl font-bold">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 space-y-4 w-full max-w-xs"
          >
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border-2 border-black rounded-2xl py-2 px-5"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="border-2 border-black rounded-2xl py-2 px-5"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#AEFF53] py-2 px-8 rounded-2xl font-semibold hover:bg-[#FF0000] text-white transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-[#AEFF53] underline hover:text-[#FF0000]"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Signup Form */}
        <div
          ref={signupFormMobileRef}
          className="absolute top-0 right-0 w-full h-full bg-white flex flex-col justify-center items-center px-6 py-10 z-[20]"
          style={{ transform: "translateX(100%)" }}
        >
          <h1 className="text-3xl font-bold">Create Account</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 space-y-4 w-full max-w-xs"
          >
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="border-2 border-black rounded-2xl py-2 px-5"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border-2 border-black rounded-2xl py-2 px-5"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="border-2 border-black rounded-2xl py-2 px-5"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF0000] text-white py-2 px-4 rounded-2xl font-semibold hover:bg-green-500 hover:text-white transition"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-[#FF0000] underline hover:text-[#AEFF53]"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;