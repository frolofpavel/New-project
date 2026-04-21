"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  text: string;
  className?: string;
  /** letter-by-letter or word-by-word */
  mode?: "chars" | "words";
  stagger?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
};

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const itemVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitText({
  text,
  className,
  mode = "chars",
  stagger = 0.024,
  delay = 0,
  as = "span",
  once = true,
}: Props) {
  const Wrapper = motion[as];
  const words = text.split(/(\s+)/);

  return (
    <Wrapper
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return <span key={`s-${wi}`}> </span>;
        }
        if (mode === "words") {
          return (
            <span key={wi} className="split-word" aria-hidden="true">
              <motion.span className="split-inline" variants={itemVariants}>
                {word}
              </motion.span>
            </span>
          );
        }
        const chars: ReactNode[] = [];
        for (let ci = 0; ci < word.length; ci++) {
          chars.push(
            <span key={`${wi}-${ci}`} className="split-char" aria-hidden="true">
              <motion.span className="split-inline" variants={itemVariants}>
                {word[ci]}
              </motion.span>
            </span>,
          );
        }
        return (
          <span key={wi} className="split-word">
            {chars}
          </span>
        );
      })}
    </Wrapper>
  );
}
