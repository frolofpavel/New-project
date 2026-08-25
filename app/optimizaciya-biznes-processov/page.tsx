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
  title: "Оптимизация бизнес-процессов с помощью AI-агентов",
  description:
    "Автоматизация рутинных операций, сокращение ФОТ и ускорение процессов через AI-агентов. Аудит, пилот, система под ключ. Павел Фролов, Новосибирск.",
  path: "/optimizaciya-biznes-processov",
});

const problems = [
  {
    num: "01",
    title: "Менеджеры тратят 60% времени на рутину",
    text: "Заполнение CRM, подготовка отчётов, перенос данных между системами. AI-агент берёт это на себя - человек занимается клиентами.",
  },
  {
    num: "02",
    title: "Процессы зависят от конкретных людей",
    text: "Уволился сотрудник - встал процесс. AI-агент работает по регламенту 24/7, не болеет и не увольняется.",
  },
  {
    num: "03",
    title: "Масштабирование = набор штата",
    text: "Каждый новый клиент требует новых рук. AI-агент обрабатывает в 5-10 раз больше операций без роста ФОТ.",
  },
];

const cases = [
  {
    title: "Обработка заявок",
    before: "Менеджер вручную разбирает 40-60 заявок в день, тратит 3 часа",
    after: "AI-агент квалифицирует заявки за секунды, менеджер работает только с горячими",
    metric: "Время обработки -80%",
  },
  {
    title: "Подготовка КП",
    before: "Каждое коммерческое предложение собирается вручную 2-4 часа",
    after: "AI-агент генерирует персонализированное КП за 3 минуты по данным из CRM",
    metric: "С 4 часов до 3 минут",
  },
  {
    title: "Отчётность",
    before: "Еженедельные отчёты собираются 2 дня из разных источников",
    after: "AI-агент собирает дашборд автоматически, данные всегда актуальны",
    metric: "Экономия 8 часов/неделя",
  },
];

function buildSchema() {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Оптимизация бизнес-процессов с помощью AI-агентов",
    description:
      "Автоматизация рутинных операций через AI-агентов: аудит процессов, пилот, масштабирование. Сокращение ФОТ и ускорение операций.",
    url: absoluteUrl("/optimizaciya-biznes-processov"),
    provider: { "@id": ids.person },
    areaServed: { "@type": "Country", name: "Россия" },
    serviceType: "Оптимизация бизнес-процессов, внедрение AI-автоматизации",
  };
}

export default function OptimizaciyaBiznesProcessovPage() {
  return (
    <>
      <Script id="obp-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildSchema())}
      </Script>

      <section className="page-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: "Оптимизация процессов", path: "/optimizaciya-biznes-processov" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="AI для бизнес-процессов"
          title="Оптимизация бизнес-процессов через AI-агентов"
          description="Не «внедрим нейросеть». А конкретно: находим процесс, который жрёт время и деньги, ставим AI-агента, замеряем результат. Для компаний с выручкой 50-500 млн ₽/год."
        />
        <div className="page-hero__actions">
          <MagneticLink href="/contact" className="button button--primary" external={false}>
            Бесплатный аудит процессов - 30 мин
          </MagneticLink>
          <MagneticLink href={siteConfig.telegram} className="button button--secondary" external goal="lead_telegram">
            Написать в Telegram
          </MagneticLink>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Проблемы"
          title="Что тормозит рост без AI"
          description="Типичные ситуации, которые я вижу у клиентов каждую неделю. Если узнаёте хотя бы одну - имеет смысл поговорить."
        />
        <div className="cards-grid-3 cards-grid-3--tight">
          {problems.map((item) => (
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
            eyebrow="Примеры"
            title="До и после: что меняет AI-агент в процессе"
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {cases.map((item) => (
              <GlowCard key={item.title} className="principle-card">
                <h3 className="principle-card__title">{item.title}</h3>
                <p className="principle-card__text">
                  <strong>Было:</strong> {item.before}
                </p>
                <p className="principle-card__text">
                  <strong>Стало:</strong> {item.after}
                </p>
                <p className="principle-card__text" style={{ color: "var(--accent)", fontWeight: 600 }}>
                  {item.metric}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Пакеты"
          title="Три формата работы"
          description="Начинаем с аудита. Если AI-агент не нужен - скажу честно. Если нужен - покажу какой пакет закроет задачу."
        />
        <div className="cards-grid-3 cards-grid-3--tight">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Подход"
            title="Как это работает"
            description="Не продаю технологию. Продаю результат: экономию времени, денег и нервов."
          />
          <div style={{ maxWidth: 640 }}>
            <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
              Я не интегратор с командой из 20 человек и не платформа с конструктором.
              Я - архитектор AI-систем. За плечами две собственные production-системы:
              AIOS (32+ агента, личная операционная система) и AI-BOS (система для маркетингового агентства, 29 клиентов).
            </p>
            <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
              Работаю с владельцем напрямую. Нахожу процесс, где AI-агент даст максимальный эффект.
              Делаю пилот с измеримым результатом. Если пилот окупается - масштабируем.
            </p>
            <Link href="/ai-agenty" className="button button--secondary" style={{ marginTop: 12 }}>
              Подробнее про AI-агентов
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Следующий шаг"
          title="Бесплатный аудит - 30 минут"
          description="Разберём 1-2 процесса, где теряются деньги. Покажу, подходит ли AI-агент для вашей задачи."
        />
        <div style={{ marginTop: 24 }}>
          <Link href="/contact" className="button button--primary">
            Записаться на аудит
          </Link>
        </div>
      </section>

      <SeoTopicHub excludePath="/optimizaciya-biznes-processov" />
      <LeadStrip />
    </>
  );
}
