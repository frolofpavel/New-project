"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { metrikaGoals, reachGoal } from "@/lib/metrika";

export function LeadStrip() {
  return (
    <section className="lead-strip">
      <div className="lead-strip__inner">
        <div>
          <p className="section-heading__eyebrow">Есть задача?</p>
          <h2>Воронка: знакомство → бесплатный аудит 30 мин → пилот → система агентов.</h2>
        </div>

        <div className="lead-strip__actions">
          <Link
            href="/ai-agenty"
            className="button button--primary"
            onClick={() => reachGoal(metrikaGoals.auditClick)}
          >
            AI-агенты под ключ
          </Link>
          <Link
            href="/contact"
            className="button button--secondary"
            onClick={() => reachGoal(metrikaGoals.auditClick)}
          >
            Записаться на аудит
          </Link>
          <a
            href={siteConfig.telegram}
            className="button button--secondary"
            target="_blank"
            rel="noreferrer"
            onClick={() => reachGoal(metrikaGoals.telegramClick)}
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
