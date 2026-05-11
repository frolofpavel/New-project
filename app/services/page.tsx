import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { ServiceCard } from "@/components/cards";
import { GlowCard } from "@/components/motion/glow-card";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-config";
import { buildPageMetadata, buildServiceSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Услуги - внедрение AI-агентов для бизнеса",
  description:
    "AI-агенты для оптимизации бизнес-процессов, автоматизации маркетинга и усиления продаж. Аудит, пилот, система под ключ. Павел Фролов.",
  path: "/services",
});

const directions = [
  {
    href: "/optimizaciya-biznes-processov",
    title: "Оптимизация бизнес-процессов",
    text: "Автоматизация рутинных операций, сокращение ФОТ, ускорение обработки заявок и отчётности через AI-агентов.",
  },
  {
    href: "/ai-avtomatizaciya-marketinga",
    title: "AI-автоматизация маркетинга",
    text: "Лидогенерация на автопилоте, контент-конвейер, персонализация коммуникаций, автоматическая аналитика.",
  },
  {
    href: "/ai-dlya-prodazh",
    title: "AI для продаж",
    text: "Квалификация лидов, генерация КП, follow-up цепочки, мониторинг источников - AI-агент как второй менеджер.",
  },
];

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
          title="Внедрение AI-агентов для бизнеса"
          description="Одна экспертиза - три направления. Нахожу процесс, который жрёт время и деньги, и ставлю AI-агента с измеримым результатом."
        />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Направления"
          title="Где AI-агенты дают максимальный эффект"
        />
        <div className="cards-grid-3 cards-grid-3--tight">
          {directions.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", color: "inherit" }}>
              <GlowCard className="principle-card">
                <h3 className="principle-card__title">{item.title}</h3>
                <p className="principle-card__text">{item.text}</p>
                <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>
                  Подробнее →
                </span>
              </GlowCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Пакеты"
            title="Три формата работы"
            description="Начинаем с аудита. Если AI не нужен - скажу честно. Если нужен - покажу какой пакет логичен первым."
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
