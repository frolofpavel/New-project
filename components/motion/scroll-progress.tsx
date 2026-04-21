"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.3,
  });

  if (reduceMotion) return null;

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
