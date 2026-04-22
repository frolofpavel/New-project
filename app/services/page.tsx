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
    "Три формата работы: аудит маркетинговой архитектуры, построение AI-систем, полное ведение маркетинга. Под ключ, от 3 недель.",
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
