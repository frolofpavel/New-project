"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { MouseEvent, ReactNode, useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
};

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.3,
  external = false,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const commonProps = {
    ref,
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: sx, y: sy },
  } as const;

  if (external) {
    return (
      <motion.a
        {...commonProps}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a {...commonProps}>{children}</motion.a>
    </Link>
  );
}
