import type { Metadata } from "next";
import Script from "next/script";

import { ServiceCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-config";
import { buildPageMetadata, buildServiceSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Услуги",
  description:
    "Три пакета: аудит процессов под AI, пилот одного AI-агента, система агентов с интеграциями. Без почасовки как главного оффера. Павел Фролов.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Script id="service-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildServiceSchema())}
      </Script>
      <section className="page-hero">
        <SectionHeading
          as="h1"
          eyebrow="Услуги"
          title="Три пакета внедрения AI-агентов"
          description="Сначала фиксируем процесс и данные, потом пилот с измеримым эффектом, затем — система. Подробная воронка и смыслы для HH — на странице /ai-agenty."
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
