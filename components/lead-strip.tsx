import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function LeadStrip() {
  return (
    <section className="lead-strip">
      <div className="container lead-strip__inner">
        <div>
          <p className="section-heading__eyebrow">Есть задача?</p>
          <h2>Соберем сайт, позиционирование или контентную систему под ваш следующий шаг.</h2>
        </div>

        <div className="lead-strip__actions">
          <Link href="/contact" className="button button--primary">
            Обсудить проект
          </Link>
          <a href={siteConfig.telegram} className="button button--ghost" target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
