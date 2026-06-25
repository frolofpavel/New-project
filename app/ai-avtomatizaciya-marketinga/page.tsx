import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { LeadStrip } from "@/components/lead-strip";
import { GlowCard } from "@/components/motion/glow-card";
import { MagneticLink } from "@/components/motion/magnetic";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicHub } from "@/components/seo-topic-hub";
import { ServiceCard } from "@/components/cards";
import { siteConfig, services } from "@/lib/site-config";
import { buildPageMetadata, absoluteUrl, siteEntityIds } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-автоматизация маркетинга - агенты для лидогенерации и контента",
  description:
    "AI-агенты для маркетинга: автоматизация лидогенерации, контент-производства, email-цепочек и аналитики. Пилот с измеримым ROI. Павел Фролов.",
  path: "/ai-avtomatizaciya-marketinga",
});

const useCases = [
  {
    num: "01",
    title: "Лидогенерация на автопилоте",
    text: "AI-агент мониторит источники (HH, Авито, соцсети), находит потенциальных клиентов, квалифицирует и готовит персонализированное первое касание. Менеджер подключается к уже тёплому диалогу.",
  },
  {
    num: "02",
    title: "Контент-конвейер",
    text: "AI-агент генерирует черновики постов, адаптирует один материал под 5 площадок (Telegram, IG, VK, сайт, email), готовит SEO-тексты. Маркетолог редактирует, а не пишет с нуля.",
  },
  {
    num: "03",
    title: "Персонализация коммуникаций",
    text: "AI-агент анализирует историю клиента в CRM и готовит персональное предложение, follow-up или КП. Не шаблон, а текст, учитывающий контекст конкретной сделки.",
  },
  {
    num: "04",
    title: "Аналитика и отчётность",
    text: "AI-агент собирает данные из Яндекс.Метрики, CRM, рекламных кабинетов. Формирует дашборд с выводами: что работает, что нет, куда перераспределить бюджет.",
  },
];

const results = [
  { metric: "x3-5", label: "рост числа касаний без увеличения команды" },
  { metric: "-70%", label: "время на подготовку контента" },
  { metric: "+40%", label: "конверсия из заявки в сделку (персонализация)" },
  { metric: "24/7", label: "мониторинг и реакция на лиды" },
];

function buildSchema() {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AI-автоматизация маркетинга",
    description:
      "AI-агенты для маркетинга: лидогенерация, контент, персонализация, аналитика. Внедрение под ключ с измеримым ROI.",
    url: absoluteUrl("/ai-avtomatizaciya-marketinga"),
    provider: { "@id": ids.person },
    areaServed: { "@type": "Country", name: "Россия" },
    serviceType: "AI-автоматизация маркетинга и лидогенерации",
  };
}

export default function AiAvtomatizaciyaMarketingaPage() {
  return (
    <>
      <Script id="aam-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildSchema())}
      </Script>

      <section className="page-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: "AI в маркетинге", path: "/ai-avtomatizaciya-marketinga" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="AI для маркетинга"
          title="AI-автоматизация маркетинга: агенты, которые приводят клиентов"
          description="Маркетолог один, а задач на пятерых. Знакомо? AI-агент закрывает рутину: мониторит лиды, генерирует контент, персонализирует предложения. Маркетолог занимается стратегией."
        />
        <div className="page-hero__actions">
          <MagneticLink href="/contact" className="button button--primary" external={false}>
            Обсудить автоматизацию маркетинга
          </MagneticLink>
          <MagneticLink href={siteConfig.telegram} className="button button--secondary" external>
            Написать в Telegram
          </MagneticLink>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Сценарии"
          title="Что умеют AI-агенты в маркетинге"
          description="Не абстрактный ChatGPT в браузере. Конкретные агенты, встроенные в ваши процессы и системы."
        />
        <div className="cards-grid-3 cards-grid-3--tight" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {useCases.map((item) => (
            <GlowCard key={item.num} className="principle-card">
              <div className="principle-card__num" aria-hidden="true">{item.num}</div>
              <h3 className="principle-card__title">{item.title}</h3>
              <p className="principle-card__text">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Результаты"
            title="Что получают клиенты"
          />
          <div className="cards-grid-3 cards-grid-3--tight" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {results.map((item) => (
              <GlowCard key={item.label} className="principle-card">
                <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "var(--accent)", marginBottom: 8, textAlign: "center" }}>
                  {item.metric}
                </div>
                <p className="principle-card__text" style={{ textAlign: "center" }}>{item.label}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Почему я"
          title="Маркетолог, который строит AI-системы"
          description="19 лет в маркетинге. Последние 2 года - строю AI-агентов для своего агентства и клиентов."
        />
        <div style={{ maxWidth: 640 }}>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            У меня работает AI-BOS - система из AI-агентов, которая обслуживает 29 клиентов маркетингового агентства.
            Генерация КП, мониторинг вакансий на HH для B2B-продаж, автоматические отчёты, контент-конвейер.
          </p>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            Я не теоретик. Каждый агент, которого предлагаю клиенту, уже работает в моём бизнесе.
            Поэтому знаю, где AI реально помогает, а где - пустая трата денег.
          </p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Пакеты"
            title="Форматы работы"
            description="Начинаем с аудита маркетинговых процессов. Нахожу точку с максимальным рычагом и предлагаю конкретный пилот."
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Следующий шаг"
          title="Разберём ваш маркетинг за 30 минут"
          description="Покажу где AI-агент даст максимальный эффект именно в вашей воронке. Бесплатно, без обязательств."
        />
        <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/contact" className="button button--primary">
            Записаться на аудит
          </Link>
          <Link href="/blog/vnedrenie-ai-agenta-v-kompanii-poshagovo" className="button button--secondary">
            Читать: как внедрять AI-агента пошагово
          </Link>
        </div>
      </section>

      <SeoTopicHub excludePath="/ai-avtomatizaciya-marketinga" />
      <LeadStrip />
    </>
  );
}
