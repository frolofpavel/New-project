"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  duration?: number;
};

/**
 * Парсит строки вида "19+", "50M", "300%", "−35%", "61" — выделяет число и префикс/суффикс.
 */
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: null as number | null, suffix: raw };
  const [, prefix, numStr, suffix] = match;
  return { prefix, num: parseFloat(numStr), suffix };
}

export function CountUp({ value, duration = 1.4 }: CountUpProps) {
  const { prefix, num, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(num == null ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView || num == null) {
      if (num == null) setDisplay(value);
      return;
    }
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const isInt = Number.isInteger(num);
        const out = isInt ? Math.round(latest).toString() : latest.toFixed(1);
        setDisplay(`${prefix}${out}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, num, duration, prefix, suffix, value, reduceMotion]);

  return <span ref={ref}>{display}</span>;
}
