import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function LeadStrip() {
  return (
    <section className="lead-strip">
      <div className="lead-strip__inner">
        <div>
          <p className="section-heading__eyebrow">Есть задача?</p>
          <h2>Разберём архитектуру, внедрим AI-агентов, соберём маркетинг как систему.</h2>
        </div>

        <div className="lead-strip__actions">
          <Link href="/contact" className="button button--primary">
            Обсудить проект
          </Link>
          <a
            href={siteConfig.telegram}
            className="button button--secondary"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
