"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";

import { MagneticLink } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { siteConfig } from "@/lib/site-config";

const TERMINAL_LINES: Array<{ type: "prompt" | "arrow" | "folder" | "comment" | "spacer"; text: string }> = [
  { type: "prompt", text: "whoami" },
  { type: "arrow", text: "Pavel Frolov · маркетолог-архитектор" },
  { type: "spacer", text: "" },
  { type: "prompt", text: "ls ./projects" },
  { type: "folder", text: "AIOS/  AI-BOS/  agency/  clients/" },
  { type: "spacer", text: "" },
  { type: "prompt", text: "cat ./current_focus" },
  { type: "arrow", text: "AI-операционная система агентства v3" },
  { type: "spacer", text: "" },
  { type: "prompt", text: "cat ./results" },
  { type: "comment", text: "# Расцветай: 7 500 лидов/мес · 5+ лет" },
  { type: "comment", text: "# CPL −35% · ROMI 300%+ · B2B с 0 до 312M" },
];

function useTypedTerminal(instant: boolean) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (instant) {
      setVisibleLines(TERMINAL_LINES.length);
      setTypedChars(0);
      return;
    }
    let raf: number;
    let start = performance.now();
    const totalLines = TERMINAL_LINES.length;

    function tick(now: number) {
      const elapsed = now - start;
      const charDelay = 12;
      const lineGap = 180;

      let line = 0;
      let charsInCurrent = 0;
      let acc = 0;

      for (let i = 0; i < totalLines; i++) {
        const text = TERMINAL_LINES[i].text;
        const duration = text.length * charDelay + lineGap;
        if (elapsed <= acc + duration) {
          line = i;
          charsInCurrent = Math.min(text.length, Math.max(0, Math.floor((elapsed - acc) / charDelay)));
          break;
        }
        acc += duration;
        if (i === totalLines - 1) {
          line = totalLines;
          charsInCurrent = 0;
        }
      }

      setVisibleLines(line);
      setTypedChars(charsInCurrent);

      if (line < totalLines) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [instant]);

  return { visibleLines, typedChars };
}

function useTerminalTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  return { ref, onMove, onLeave, rx, ry, tx, ty };
}

export function HeroBlock() {
  const reduceMotion = useReducedMotion();
  const instantMotion = !!reduceMotion;
  const { visibleLines, typedChars } = useTypedTerminal(instantMotion);
  const tilt = useTerminalTilt();

  return (
    <section id="hero" className="hero">
      <div className="hero__blob hero__blob--a" aria-hidden="true" />
      <div className="hero__blob hero__blob--b" aria-hidden="true" />
      <div className="hero__noise" aria-hidden="true" />

      <div className="hero__grid">
        <div>
          <motion.div
            className="hero__eyebrow"
            initial={instantMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: instantMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="eyebrow-tag">{siteConfig.hero.eyebrow}</span>
            <span className="eyebrow-sep" aria-hidden="true">·</span>
            <span className="eyebrow-live">
              <span className="status-dot" aria-hidden="true" />
              {siteConfig.hero.eyebrowLive}
            </span>
          </motion.div>

          <h1 className="hero__h1">
            {siteConfig.hero.titleLines.map((line, index) => (
              <span
                key={index}
                className={`hero__h1-line ${
                  line.variant === "accent" ? "accent" : line.variant === "muted" ? "muted-line" : ""
                }`}
              >
                <SplitText
                  text={line.text}
                  className="hero__h1-word"
                  mode="chars"
                  stagger={0.022}
                  delay={0.15 + index * 0.18}
                />
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__sub"
            initial={instantMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: instantMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: instantMotion ? 0 : 0.5,
            }}
          >
            {siteConfig.hero.description}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={instantMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: instantMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: instantMotion ? 0 : 0.6,
            }}
          >
            <MagneticLink href={siteConfig.hero.primaryCta.href} className="button button--primary">
              {siteConfig.hero.primaryCta.label}
            </MagneticLink>
            <Link href={siteConfig.hero.secondaryCta.href} className="button button--secondary">
              {siteConfig.hero.secondaryCta.label}
            </Link>
          </motion.div>

        </div>

        <motion.div
          className="terminal-wrap"
          ref={tilt.ref}
          onMouseMove={instantMotion ? undefined : tilt.onMove}
          onMouseLeave={instantMotion ? undefined : tilt.onLeave}
          initial={instantMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: instantMotion ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: instantMotion ? 0 : 0.2,
          }}
          style={
            instantMotion
              ? { transformPerspective: 1200 }
              : {
                  rotateX: tilt.rx,
                  rotateY: tilt.ry,
                  x: tilt.tx,
                  y: tilt.ty,
                  transformPerspective: 1200,
                  transformStyle: "preserve-3d",
                }
          }
          aria-hidden="true"
        >
          <div className="terminal">
            <div className="terminal__bar">
              <div className="terminal__dots">
                <span className="dot-r" />
                <span className="dot-y" />
                <span className="dot-g" />
              </div>
              <span className="terminal__name">status.sh</span>
              <span />
            </div>
            <div className="terminal__viewport">
              <div className="terminal__bg" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/terminal-graph-poster.webp"
                >
                  <source src="/media/terminal-graph.webm" type="video/webm" />
                  <source src="/media/terminal-graph.mp4" type="video/mp4" />
                </video>
                <div className="terminal__bg-veil" />
              </div>
              <div className="terminal__body">
              {TERMINAL_LINES.map((line, i) => {
                if (i > visibleLines) return null;
                const text = i === visibleLines ? line.text.slice(0, typedChars) : line.text;
                const isActive = i === visibleLines;
                if (line.type === "spacer") return <br key={i} />;
                if (line.type === "prompt") {
                  return (
                    <div key={i}>
                      <span className="t-prompt">$ </span>
                      <span className="t-cmd">{text}</span>
                      {isActive && <span className="t-cursor" />}
                    </div>
                  );
                }
                if (line.type === "arrow") {
                  return (
                    <div key={i}>
                      <span className="t-arrow">→</span>
                      <span className="t-val">{text}</span>
                      {isActive && <span className="t-cursor" />}
                    </div>
                  );
                }
                if (line.type === "folder") {
                  return (
                    <div key={i}>
                      <span className="t-path">{text}</span>
                      {isActive && <span className="t-cursor" />}
                    </div>
                  );
                }
                return (
                  <div key={i}>
                    <span className="t-comment">{text}</span>
                    {isActive && <span className="t-cursor" />}
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <div className="terminal__status">
            <span className="ts-dot" />
            <span>{siteConfig.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
