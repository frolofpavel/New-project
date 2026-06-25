import Link from "next/link";

import { seoHubPages } from "@/lib/site-config";

type SeoTopicHubProps = {
  excludePath?: string;
  title?: string;
  description?: string;
};

export function SeoTopicHub({
  excludePath,
  title = "AI-агенты для бизнеса",
  description = "Посадочные страницы и материалы по внедрению AI-агентов — от аудита до production.",
}: SeoTopicHubProps) {
  const pages = seoHubPages.filter((page) => page.href !== excludePath);

  return (
    <section className="section section--muted seo-topic-hub">
      <div className="section__inner">
        <p className="section-label">Темы</p>
        <h2 className="section-h2">{title}</h2>
        <p className="section-sub">{description}</p>
        <div className="seo-topic-hub__grid">
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="seo-topic-hub__card">
              <span className="seo-topic-hub__title">{page.title}</span>
              <span className="seo-topic-hub__desc">{page.description}</span>
              <span className="seo-topic-hub__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
