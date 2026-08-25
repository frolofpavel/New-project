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
import { aiSalesFaqs, siteConfig, services } from "@/lib/site-config";
import { buildFaqSchema, buildPageMetadata, absoluteUrl, siteEntityIds } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI для продаж - автоматизация воронки и работы с клиентами",
  description:
    "AI-агенты для отдела продаж: квалификация лидов, персональные КП, follow-up цепочки, CRM-автоматизация. Пилот с измеримым результатом. Павел Фролов.",
  path: "/ai-dlya-prodazh",
});

const painPoints = [
  {
    problem: "Менеджеры забывают перезвонить",
    solution: "AI-агент ведёт follow-up автоматически: напоминает менеджеру или отправляет сообщение сам",
  },
  {
    problem: "КП готовится часами",
    solution: "AI-агент генерирует персонализированное КП за 3 минуты на основе данных из CRM и истории переговоров",
  },
  {
    problem: "Лиды теряются между каналами",
    solution: "AI-агент собирает заявки из всех источников, квалифицирует и распределяет по менеджерам",
  },
  {
    problem: "Нет времени на холодные касания",
    solution: "AI-агент мониторит HH, Авито, соцсети - находит компании с потребностью и готовит первое сообщение",
  },
  {
    problem: "Отчёты собираются вручную",
    solution: "AI-агент формирует отчёт по воронке, конверсиям и прогнозу выручки автоматически",
  },
  {
    problem: "Новички долго входят в работу",
    solution: "AI-агент подсказывает скрипт, готовит материалы под сделку, проверяет качество заполнения CRM",
  },
];

const stages = [
  {
    num: "1",
    title: "Аудит воронки",
    text: "Разбираю вашу воронку продаж. Нахожу где теряются деньги: долгий цикл сделки, низкая конверсия, ручная рутина. Бесплатно, 30 минут.",
  },
  {
    num: "2",
    title: "Пилот одного агента",
    text: "Выбираем одну точку с максимальным рычагом. Внедряем AI-агента, измеряем результат за 2-4 недели. Типичный чек пилота - от 100 тыс ₽.",
  },
  {
    num: "3",
    title: "Система агентов",
    text: "Если пилот показал ROI - масштабируем. Сеть агентов на всю воронку: от первого касания до закрытия сделки и повторных продаж.",
  },
];

function buildSchema() {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AI для продаж - автоматизация воронки",
    description:
      "AI-агенты для отдела продаж: квалификация лидов, генерация КП, follow-up, CRM-автоматизация. Внедрение под ключ.",
    url: absoluteUrl("/ai-dlya-prodazh"),
    provider: { "@id": ids.person },
    areaServed: { "@type": "Country", name: "Россия" },
    serviceType: "AI-автоматизация продаж и CRM",
  };
}

export default function AiDlyaProdazhPage() {
  return (
    <>
      <Script id="adp-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildSchema())}
      </Script>
      <Script id="adp-faq-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildFaqSchema(aiSalesFaqs))}
      </Script>

      <section className="page-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: "AI для продаж", path: "/ai-dlya-prodazh" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="AI для продаж"
          title="AI-агенты для отдела продаж: больше сделок без расширения штата"
          description="Ваши менеджеры тратят 40% времени на рутину вместо продаж. AI-агент забирает подготовку КП, follow-up, квалификацию лидов и отчётность. Менеджер продаёт - агент обеспечивает."
        />
        <div className="page-hero__actions">
          <MagneticLink href="/contact" className="button button--primary" external={false}>
            Бесплатный аудит воронки продаж
          </MagneticLink>
          <MagneticLink href={siteConfig.telegram} className="button button--secondary" external goal="lead_telegram">
            Написать в Telegram
          </MagneticLink>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Боли → решения"
          title="Знакомые проблемы? У AI-агента есть ответ"
        />
        <div className="cards-grid-3 cards-grid-3--tight" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {painPoints.map((item) => (
            <GlowCard key={item.problem} className="principle-card">
              <h3 className="principle-card__title" style={{ color: "var(--text-muted)" }}>
                {item.problem}
              </h3>
              <p className="principle-card__text">→ {item.solution}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Как это работает"
            title="Три шага к AI-продажам"
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {stages.map((item) => (
              <GlowCard key={item.num} className="principle-card">
                <div className="principle-card__num" aria-hidden="true">{item.num}</div>
                <h3 className="principle-card__title">{item.title}</h3>
                <p className="principle-card__text">{item.text}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Мой опыт"
          title="Я сам продаю через AI-агентов"
        />
        <div style={{ maxWidth: 640 }}>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            У меня работает HH-автоматизация: AI-агент мониторит вакансии на HeadHunter,
            анализирует компании, генерирует персонализированные отклики и КП.
            Воронка от первого касания до встречи - полностью на AI.
          </p>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            Второй агент ведёт CRM: follow-up цепочки, напоминания о дожимах,
            автоматические отчёты по воронке. За месяц один агент делает больше касаний,
            чем менеджер за квартал.
          </p>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
            Всё, что предлагаю - работает в моём бизнесе прямо сейчас.
            Не теория, не «мы можем сделать». Работающие системы.
          </p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Пакеты"
            title="Форматы работы"
            description="Начинаем с аудита вашей воронки. Если AI-агент не нужен - скажу прямо."
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading eyebrow="FAQ" title="Вопросы про AI в отделе продаж" />
          <dl className="faq-list">
            {aiSalesFaqs.map((item) => (
              <div key={item.question} className="faq-list__item">
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Блог"
            title="Разбор пилота для отдела продаж"
            description="Что реально автоматизировать за 30 дней: процесс, данные, метрика и когда AI не нужен."
          />
          <div className="ai-agenty__blog-links">
            <Link href="/blog/ai-agent-dlya-otdela-prodazh-za-30-dney" className="button button--secondary">
              AI-агент для продаж за 30 дней — полный разбор
            </Link>
            <Link href="/blog/keys-kvalifikaciya-lidov-ai-agentom" className="button button--secondary">
              Кейс: квалификация лидов — какие цифры смотреть
            </Link>
            <Link href="/blog/ai-agenty-dlya-b2b-dlinnyy-cikl" className="button button--secondary">
              AI-агенты для B2B с длинным циклом
            </Link>
            <Link href="/blog/ai-agent-i-crm-minimalnye-integracii" className="button button--secondary">
              AI-агент и CRM: минимальные интеграции
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Следующий шаг"
          title="Разберём вашу воронку за 30 минут"
          description="Найду где AI-агент даст максимальный рост конверсии. Бесплатно, без обязательств."
        />
        <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/contact" className="button button--primary">
            Записаться на аудит
          </Link>
          <Link href="/ai-agenty" className="button button--secondary">
            Подробнее про AI-агентов
          </Link>
        </div>
      </section>

      <SeoTopicHub excludePath="/ai-dlya-prodazh" />
      <LeadStrip />
    </>
  );
}
