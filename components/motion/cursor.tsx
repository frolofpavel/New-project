"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, [role=button], [data-cursor=hover], .button, input[type=submit]";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqFine = window.matchMedia("(pointer: fine)");
    if (!mqFine.matches) return;

    setMounted(true);
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovered = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onDown = () => {
      pressed = true;
      ring.classList.add("is-pressed");
    };
    const onUp = () => {
      pressed = false;
      ring.classList.remove("is-pressed");
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest(HOVER_SELECTOR)) {
        if (!hovered) {
          hovered = true;
          ring.classList.add("is-hovered");
        }
      } else if (hovered) {
        hovered = false;
        ring.classList.remove("is-hovered");
      }
    };

    const onLeave = () => ring.classList.add("is-hidden");
    const onEnter = () => ring.classList.remove("is-hidden");

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
      void pressed;
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
