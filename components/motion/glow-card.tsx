"use client";

import { MouseEvent, ReactNode, useRef } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
};

export function GlowCard({ children, className, as = "article" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }

  const mergedClassName = `glow-card ${className ?? ""}`;
  const inner = (
    <>
      <div className="glow-card__glow" aria-hidden="true" />
      <div className="glow-card__content">{children}</div>
    </>
  );

  if (as === "article") {
    return (
      <article
        ref={ref as unknown as React.RefObject<HTMLElement>}
        onMouseMove={onMove}
        className={mergedClassName}
      >
        {inner}
      </article>
    );
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={mergedClassName}>
      {inner}
    </div>
  );
}
