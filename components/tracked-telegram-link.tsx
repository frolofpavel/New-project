"use client";

import { ReactNode } from "react";

import { metrikaGoals, reachGoal } from "@/lib/metrika";

type Props = {
  href: string;
  children: ReactNode;
};

export function TrackedTelegramLink({ href, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => reachGoal(metrikaGoals.telegramClick)}
    >
      {children}
    </a>
  );
}
