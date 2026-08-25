"use client";

import dynamic from "next/dynamic";

const ScrollProgressInner = dynamic(
  () => import("@/components/motion/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false },
);

export function ScrollProgressLazy() {
  return <ScrollProgressInner />;
}
