import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { LeadStrip } from "@/components/lead-strip";
import { GlowCard } from "@/components/motion/glow-card";
import { MagneticLink } from "@/components/motion/magnetic";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/cards";
import { siteConfig, services } from "@/lib/site-config";
import { buildAiAgentsLandingSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-агенты под ключ",
  description:
    "Аудит процессов, пилот одного AI-агента, система агентов с интеграциями. Для владельцев бизнеса 50–500 млн ₽/год. Павел Фролов.",
  path: "/ai-agenty",
});

const hhAngles = [
  {
    title: "Вакансия «AI в штат» дороже пилота",
    text: "Зарплата, налоги, онбординг и риск несоответствия задаче. Пилот с фиксированным результатом закрывает гипотезу быстрее, чем полгода найма.",
  },
  {
    title: "Задача не «нейросеть», а процесс",
    text: "Нужны входы и выходы в CRM, регламент качества и ответственность за данные. Я проектирую контур целиком — не только промпт.",
  },
  {
    title: "Масштабирование после доказанного ROI",
    text: "Сначала один агент с метрикой (время, конверсия, экономия ФОТ). Затем — сеть агентов и интеграции без хаоса.",
  },
];

export default function AiAgentsPage() {
  return (
    <>
      <Script id="ai-agents-service-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildAiAgentsLandingSchema())}
      </Script>
      <section className="page-hero">
        <SectionHeading
          as="h1"
          eyebrow="Продукт"
          title="Внедрение AI-агентов под ключ — от аудита до системы в production"
          description="Целевой клиент: владелец бизнеса с выручкой порядка 50–500 млн ₽/год. Не почасовая консультация — пакеты с фиксированным объёмом и понятным результатом. Типичный чек проекта в B2B — порядка 200–700 тыс ₽; точная смета после брифа."
        />
        <div className="page-hero__actions">
          <MagneticLink href="/contact" className="button button--primary" external={false}>
            Записаться на бесплатный аудит 30 мин
          </MagneticLink>
          <MagneticLink href={siteConfig.telegram} className="button button--secondary" external>
            Telegram {siteConfig.telegramHandle}
          </MagneticLink>
        </div>
      </section>

      <section className="section">
        <p className="section-heading__eyebrow" style={{ marginBottom: "12px" }}>
          Пакеты
        </p>
        <h2
          style={{
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "28px",
            maxWidth: "720px",
          }}
        >
          Три формата — без «ставки за час» как главного оффера
        </h2>
        <div className="cards-grid-3 cards-grid-3--tight">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="HeadHunter и найм"
            title="Ищете AI-специалиста в штат?"
            description="Короткий аргумент для ЛПР и HR: вместо бесконечного найма — внедрение под ключ с понятным результатом и сроком. Ниже — смыслы, которые можно использовать в откликах и сообщениях (адаптируйте под компанию)."
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {hhAngles.map((item) => (
              <GlowCard key={item.title} className="principle-card">
                <div className="principle-card__num" aria-hidden="true">
                  ↗
                </div>
                <h3 className="principle-card__title">{item.title}</h3>
                <p className="principle-card__text">{item.text}</p>
              </GlowCard>
            ))}
          </div>
          <p className="ai-agenty__footnote">
            Готовая посадочная для диалога — эта страница. В отклике на HH можно дать ссылку{" "}
            <Link href="/ai-agenty">pavelfrolof.ru/ai-agenty</Link> и предложить созвон по аудиту.
          </p>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Направления"
          title="Где AI-агенты дают максимальный эффект"
        />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          <Link href="/optimizaciya-biznes-processov" className="button button--secondary">
            Оптимизация бизнес-процессов
          </Link>
          <Link href="/ai-avtomatizaciya-marketinga" className="button button--secondary">
            AI-автоматизация маркетинга
          </Link>
          <Link href="/ai-dlya-prodazh" className="button button--secondary">
            AI для продаж
          </Link>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Порог входа"
          title="Бесплатный аудит 30 минут"
          description="Разбираем 1–2 процесса, где теряются деньги или время. Показываю, имеет ли смысл AI-агент в вашем контексте и какой пакет логичен первым. Если задача не моя — скажу честно."
        />
        <div style={{ marginTop: "24px" }}>
          <Link href="/contact" className="button button--primary">
            Выбрать время и написать контекст
          </Link>
        </div>
      </section>

      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow="Блог"
            title="Как это работает — подробно"
            description="Пошаговый разбор внедрения AI-агентов: от аудита процессов до production. Реальный опыт, типичные ошибки и метрики."
          />
          <div className="ai-agenty__blog-links">
            <Link href="/blog/vnedrenie-ai-agenta-v-kompanii-poshagovo" className="button button--secondary">
              Внедрение AI-агента: пошагово от аудита до production
            </Link>
            <Link href="/blog" className="button button--secondary">
              Все статьи в блоге
            </Link>
          </div>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
