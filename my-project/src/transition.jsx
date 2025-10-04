import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

const transition = (OgComponent) => {
  const TransitionWrapper = () => {
    const location = useLocation()
    const overlayRef = useRef(null)

    useEffect(() => {
      if (overlayRef.current) {
        const tl = gsap.timeline()

        // Slide in from right
        tl.fromTo(
          overlayRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.5, ease: 'power4.inOut' }
        )
        // Slide out to left
        .to(overlayRef.current, {
          x: '-100%',
          duration: 0.5,
          ease: 'power4.inOut',
        })
      }
    }, [location.pathname]) // re-run on route change

    return (
      <div className="relative">
        <OgComponent />
        <div ref={overlayRef} className="slide-overlay" />
      </div>
    )
  }

  return TransitionWrapper
}

export default transition


export const transition1 = (OgComponent) => {
  const TransitionWrapper = () => {
    const location = useLocation()

    return (
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <OgComponent />
          <motion.div
            className="slide-in1"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="slide-out1"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </AnimatePresence>
  )
}
  return TransitionWrapper
}


export const transition2 = (OgComponent) => {
  const TransitionWrapper = () => {
    const location = useLocation()

    return (
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <OgComponent />
          <motion.div
            className="slide-in2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="slide-out2"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </AnimatePresence>
    )
  }
  return TransitionWrapper
}