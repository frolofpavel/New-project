import type { Metadata } from "next";

import { CaseCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { getAllCaseStudies } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Кейсы",
  description:
    "Реальные кейсы: АТА, Расцветай, БАУМЕХ и другие. Показываю выручку и лиды, не охваты. Портфолио Павла Фролова.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="page-hero">
        <SectionHeading
          as="h1"
          eyebrow="Кейсы"
          title="Реальные результаты — не охваты, а выручка и лиды"
          description="Показываю не только визуальный результат, но и логику: что мешало, что изменили и почему это сработало."
        />
      </section>

      <section className="section">
        {caseStudies.length > 0 ? (
          <div className="cards-grid-3">
            {caseStudies.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="section-heading__eyebrow">В разработке</p>
            <h2>Детальные кейсы скоро появятся</h2>
            <p>
              Пока ключевые истории — Расцветай (7 500 лидов/мес, 5+ лет), Насклад
              Групп (312 млн ₽ выручки B2B), SaaS-продукт (15 млн ₽/мес) — можно
              обсудить лично.
            </p>
          </div>
        )}
      </section>

      <LeadStrip />
    </>
  );
}
