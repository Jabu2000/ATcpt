import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";

const PageTransition = forwardRef((_, ref) => {
  const planeRef = useRef(null);
  const overlayRef = useRef(null);

  useImperativeHandle(ref, () => ({
    playTransition: (onComplete) => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete,
      });

      tl.set(overlayRef.current, { x: "100%", opacity: 0 });
      tl.fromTo(
        planeRef.current,
        { x: "0vw" },
        { x: "120vw", duration: 1, ease: "power3.in" }
      )
        .to(
          overlayRef.current,
          { x: "0%", opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .to(overlayRef.current, {
          x: "-100%",
          duration: 0.8,
          ease: "power3.out",
        });
    },
  }));

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-[#AEFF53] z-[9998]"
        style={{ transform: "translateX(100%)" }}
      />
    </>
  );
});

export default PageTransition;