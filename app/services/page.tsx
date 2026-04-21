import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Маркетинговая архитектура, AI-автоматизация маркетинга, маркетинговые операции под ключ — от проектирования до запуска и ведения.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <SectionHeading
          as="h1"
          eyebrow="Услуги"
          title="Три формата работы — от архитектуры системы до полного ведения маркетинга"
          description="Можно начать с проектирования и AI-автоматизации отдельных процессов, можно подключить меня как операционного партнёра на маркетинг под ключ."
        />
      </section>

      <section className="section">
        <div className="cards-grid-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
