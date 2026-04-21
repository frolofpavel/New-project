"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type HugeMarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * Крупный marquee-текст (80-120px). Идёт бесконечно слева или справа.
 * variant="solid" — залитый текст, "outline" — контурный (WebKit text-stroke).
 */
export function HugeMarquee({
  items,
  direction = "left",
  duration = 38,
  variant = "solid",
  className,
}: HugeMarqueeProps) {
  const reduceMotion = useReducedMotion();

  const loopItems: ReactNode = (
    <div className={`huge-marquee__row huge-marquee__row--${variant}`}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="huge-marquee__item">
          <span>{item}</span>
          <span className="huge-marquee__dot" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  if (reduceMotion) {
    return (
      <div className={`huge-marquee huge-marquee--static ${className ?? ""}`} aria-hidden="true">
        <div className="huge-marquee__track huge-marquee__track--static">{loopItems}</div>
      </div>
    );
  }

  return (
    <div className={`huge-marquee ${className ?? ""}`} aria-hidden="true">
      <motion.div
        className="huge-marquee__track"
        animate={{ x: [from, to] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopItems}
        {loopItems}
      </motion.div>
    </div>
  );
}
