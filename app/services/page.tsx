import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Упаковка личного бренда, запуск сайтов, контентные системы и цифровая презентация под лидогенерацию.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Услуги"
            title="Помогаю выстроить сайт и контент как систему, а не набор разрозненных решений."
            description="Ниже основные форматы, с которых обычно начинается работа. При необходимости они собираются в единый проект под задачу."
          />
        </div>
      </section>

      <section className="section">
        <div className="container card-grid card-grid--three">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
