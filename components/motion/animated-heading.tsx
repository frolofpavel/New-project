"use client";

import { SplitText } from "@/components/motion/split-text";

type Props = {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  mode?: "chars" | "words";
  stagger?: number;
  lineDelay?: number;
};

export function AnimatedHeading({
  lines,
  className,
  as = "h2",
  mode = "chars",
  stagger = 0.02,
  lineDelay = 0.15,
}: Props) {
  const Tag = as;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="split-line-wrap">
          <SplitText
            text={line}
            mode={mode}
            stagger={stagger}
            delay={i * lineDelay}
          />
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
