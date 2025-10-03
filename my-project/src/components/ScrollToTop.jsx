// import React, { useState, useEffect } from "react";
// import { ArrowUp } from "lucide-react"; // Optional: Lucide icon for arrow
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.scrollY > window.innerHeight);
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return (
//     <div className="w-full flex z-[10000] mix-blend-difference">
//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-6 right-6 p-3 rounded-full  bg-black text-white shadow-lg transition-opacity duration-500 hover:bg-[#492D00] hover:scale-110 cursor-pointer ${
//           isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         aria-label="Scroll to top"
//       >
//         <ArrowUp size={20} />
//       </button>
//     </div>
//   );
// };

// export default ScrollToTop;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // reset instantly
  }, [pathname]);

  return null;
}