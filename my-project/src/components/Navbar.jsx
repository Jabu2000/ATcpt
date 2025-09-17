import React, { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaSearch,
  FaWhatsapp,
} from "react-icons/fa";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);

  const toggleNav = () => {
    if (isOpen) {
      // Close menu with GSAP animation
      gsap.to(menuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => setIsOpen(false),
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      setIsOpen(true);
    }
  };

  const closeNav = () => {
    toggleNav();
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "hop" } });

    tl.to(
      [".nav-logo", ".nav-menu-icon", ".nav-contact-btn"],
      {
        y: "0%",
        duration: 12.5,
        stagger: 0.1,
        toggleActions: "play reverse play reverse",
      },
      "<"
    );
  }, []);

  // Animate in when opening
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNavbar(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 z-[40] w-full flex justify-center items-center md:px-[80px] px-[50px] transition-transform duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="nav w-full flex justify-between items-center">
          <div className="w-full flex justify-start cursor-pointer nav-menu-icon">
            <img
              src="/Menu1.png"
              alt="Menu"
              className="hover:scale-[1.2] transition duration-300"
              onClick={toggleNav}
            />
          </div>

          <div className="w-full flex justify-center items-center cursor-pointer nav-logo">
            <Link to="/" className="pt-[20px] z-[20]">
              <img
                src="/paperplan.png"
                className=""
                alt="Logo"
              />
            </Link>
          </div>

          <div className="w-full md:flex justify-end items-center z-[10] hidden gap-5 nav-contact-btn ">
            <FaSearch className="text-black font-light text-3xl transition duration-300 hover:scale-110 cursor-pointer"/>
            <Link
              to="/contact"
              aria-label="Scroll to top"
              className="flex grandstander-uniquifier text-white bg-[#ff0000] rounded-3xl font-semibold text-[14px]  px-6 py-2  hover:scale-105 transition duration-300 z-[100] cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed top-0 left-0 w-full h-full z-[90] bg-[#03071777] backdrop-blur-md opacity-0"
        />
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-[100%] h-full bg-[#03071777] z-[100] flex flex-col px-[105px] opacity-0"
        >
          <div className="flex justify-end pt-6 pb-6 cursor-pointer">
            <img
              src="/Nav-close.png"
              alt="Close"
              className="hover:scale-[1.2] transition duration-300"
              onClick={toggleNav}
            />
          </div>

          <div className="2xl:mt-[50px] flex flex-col gap-12">
            <ul className="2xl:gap-[25px] gap-[16px] flex flex-col ">
              {[
                {
                  label: "Restaurants",
                  path: "/restaurants",
                  subtitle: "How We Compare",
                },
                {
                  label: "Fun Thing To Do",
                  path: "/funthingtodo",
                  subtitle: "How We Compare",
                },
                {
                  label: "Night Life",
                  path: "/nightlife",
                  subtitle: "How We Compare",
                },
                {
                  label: "Stores",
                  path: "/stores",
                  subtitle: "How We Compare",
                },
                {
                  label: "Place To Visit",
                  path: "/PlaceToVisit",
                  subtitle: "How We Compare",
                },
                {
                  label: "Accommodation",
                  path: "/accommodation",
                  subtitle: "How We Compare",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="w-fit flex flex-col text-white hover:text-[#ff9b00] transition duration-300"
                >
                  <p className="text-[14px] font-medium">{item.label}</p>
                  <Link
                    to={item.path}
                    onClick={closeNav}
                    className="font-semibold text-2xl"
                  >
                    {item.subtitle}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-end gap-4 2xl:mt-6 mt-0">
              <div className="flex gap-6">
                <a href="https://wa.me/0774974357" target="_blank">
                  <FaWhatsapp className="text-white hover:text-[#FF9B00] text-3xl transition duration-300 hover:scale-110" />
                </a>
                <a
                  // href="https://www.instagram.com/yourusername"
                  target="_blank"
                >
                  <FaInstagram className="text-white hover:text-[#FF9B00] text-3xl transition duration-300 hover:scale-110" />
                </a>
              </div>
              <div className="w-fit text-white text-lg hover:text-[#FF9B00] hover:scale-110 transition duration-300 cursor-pointer">
                +27 77 497 4357
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
