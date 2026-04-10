import type { Metadata } from "next";

import { CaseCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Кейсы Павла Фролова: перезапуски сайтов, упаковка экспертности и проекты на стыке контента и стратегии.",
};

export default function PortfolioPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Портфолио"
            title="Кейсы, в которых цифровая упаковка становилась частью стратегии роста."
            description="Показываю не только визуальный результат, но и логику: что мешало, что изменили и почему это сработало."
          />
        </div>
      </section>

      <section className="section">
        <div className="container card-grid">
          {caseStudies.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
