import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Footer = () => {
  const planeRef = useRef(null);

  useEffect(() => {
    const plane = planeRef.current;

    // Define motion path for smooth diagonal flight
    const flightPath = {
      path: [
        { x: -200, y: 300 }, // start off bottom-left
        { x: 300, y: -100 }, // middle arc
        { x: 800, y: -600 }, // end off top-right
      ],
      // curviness: 1.25,
      // autoRotate: true,
    };

    // GSAP timeline (fly off, then restart)
    const loopTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    loopTl.fromTo(
      plane,
      { opacity: 0, x: -200, y: 300 }, // Start off-screen bottom-left
      {
        opacity: 100,
        duration: 6,
        ease: "power1.inOut",
        motionPath: flightPath,
        onComplete: () => gsap.set(plane, { opacity: 0 }), // fade out as it exits
      }
    );

    // ScrollTrigger to activate animation when footer is in view
    ScrollTrigger.create({
      trigger: plane,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => loopTl.play(),
      onLeave: () => loopTl.pause(),
      onEnterBack: () => loopTl.play(),
      onLeaveBack: () => loopTl.pause(),
    });

    return () => {
      loopTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="bg-green-500 xl:h-[100vh] flex flex-col justify-between overflow-hidden">
      {/* Top Email Bar */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-[40px]">
        <div className="flex items-center justify-between max-w-full bg-[#FF0000] hover:bg-red-400 border-2 rounded-2xl px-5 py-2 w-fit gap-[100px]">
          <a className="grandstander-uniquifier font-semibold text-white text-[12px] md:text-[14px]">
            Email Address
          </a>
          <FaArrowRight
            alt="arrow"
            className="text-white  text-[12px] md:text-[14px]"
          />
        </div>
      </div>

      {/* Footer Main */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-[80px] pb-[40px]">
        {/* Animated Paper Plane */}
        <div className="absolute left-0 bottom-0">
          <img
            ref={planeRef}
            src="/footerpaperplan.png"
            alt="paper plane"
            className="h-[400px] w-[400px] mt-[-100px] md:flex hidden"
          />
        </div>

        {/* Links */}
        <div className="flex flex-row justify-between lg:justify-end gap-10 lg:gap-[6%] mt-[40px] pr-0 lg:pr-[200px]">
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">
              Information
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { title: "Register Business", link: "" },
                { title: "About Us", link: "/about" },
                { title: "Sign In / Sign Up", link: "/login" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-[12px] cursor-pointer text-black hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">Explore</h3>
            <div className="flex flex-col gap-2">
              {[
                { title: "Restaurants", link: "/restaurants" },
                { title: "Stores", link: "/stores" },
                { title: "Events", link: "/events" },
                { title: "Activities", link: "/activities" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  aria-label={`Go to ${item.title}`}
                  className="text-[12px] cursor-pointer text-black hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">Social</h3>
            <div className="flex flex-col gap-2">
              {["Instagram", "Facebook", "YouTube", "TikTok"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    className="text-[12px] cursor-pointer text-black hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-[30px]">
          <div className="justify-center flex">
            <h2 className="text-[60px] sm:text-[100px] xl:text-[150px] 2xl:text-[230px] font-extrabold text-black text-center leading-none">
              Adventure Time
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <p className="text-[12px] text-black">© 2025 Adventure Time</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <a className="text-[16px] sm:text-[14px] cursor-pointer text-black hover:text-white">
                Terms Of Service
              </a>
              <Link
                to="/policy"
                className="text-[16px] sm:text-[14px] cursor-pointer text-black hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
