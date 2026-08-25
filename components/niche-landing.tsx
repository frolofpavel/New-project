import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { GlowCard } from "@/components/motion/glow-card";
import { MagneticLink } from "@/components/motion/magnetic";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { monthlyScale, orderedClientGroups } from "@/lib/clients";
import { metrikaGoals } from "@/lib/metrika";
import type { NicheLandingConfig } from "@/lib/niche-landing";
import { absoluteUrl, buildBreadcrumbJsonLd, buildFaqSchema, siteEntityIds } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

function buildServiceSchema(config: NicheLandingConfig) {
  const { person, website } = siteEntityIds();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(config.path)}#service`,
    name: config.hero.title,
    serviceType: config.meta.title,
    description: config.meta.description,
    url: absoluteUrl(config.path),
    provider: { "@id": person },
    isPartOf: { "@id": website },
    areaServed: [
      { "@type": "Country", name: "Россия" },
      { "@type": "Place", name: "СНГ" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(config.path),
      servicePhone: siteConfig.phone,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: config.scope.title,
      itemListElement: config.scope.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.text },
      })),
    },
  };
}

export function NicheLanding({ config }: { config: NicheLandingConfig }) {
  const groups = orderedClientGroups(config.primaryClientGroup);

  return (
    <>
      {/* Разметка отдаётся прямо в HTML, а не через next/script: Яндекс
          хуже разбирает structured data, вставленную скриптом. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(config)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(config.faq.items)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Главная", path: "/" },
              { name: config.hero.title, path: config.path },
            ]),
          ),
        }}
      />

      {/* --- Первый экран: текст + портрет --- */}
      <section className="page-hero cmo-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: config.breadcrumb, path: config.path },
          ]}
        />
        <div className="cmo-hero__grid">
          <div className="cmo-hero__copy">
            <SectionHeading
              as="h1"
              eyebrow={config.hero.eyebrow}
              title={config.hero.title}
              description={config.hero.description}
            />
            <div className="page-hero__actions">
              <MagneticLink href="#zayavka" className="button button--primary" external={false}>
                {config.hero.primaryCta}
              </MagneticLink>
              <MagneticLink
                href={siteConfig.telegram}
                className="button button--secondary"
                external
                goal={metrikaGoals.telegramClick}
              >
                Telegram {siteConfig.telegramHandle}
              </MagneticLink>
            </div>
          </div>

          <div className="cmo-hero__media">
            <div className="about-portrait-wrap">
              <div className="about-portrait">
                <Image
                  src="/images/pavel-cmo.webp"
                  alt={`${siteConfig.name} — ${config.hero.title.toLowerCase()}`}
                  width={920}
                  height={1150}
                  priority
                  sizes="(max-width: 860px) 100vw, 440px"
                  className="about-portrait__img"
                />
                <div className="about-portrait__veil" />
                <div className="cmo-hero__nameplate">
                  <strong>{siteConfig.name}</strong>
                  <span>{config.hero.nameplate}</span>
                </div>
              </div>
              <div className="about-badge about-badge--tr">
                <span className="about-badge__num">{config.hero.badge.value}</span>
                <span className="about-badge__label">{config.hero.badge.label}</span>
              </div>
            </div>
          </div>
        </div>

        <ul className="cmo-hero-proof">
          {config.proofPoints.map((item) => (
            <li key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Клиенты и объём --- */}
      <section className="cmo-clients">
        <div className="cmo-clients__inner">
          <h2 className="cmo-clients__heading">Мои клиенты</h2>

          {groups.map((group) => (
            <div key={group.key} className="cmo-clients__group">
              <p className="cmo-clients__label">{group.title}</p>
              <ul className="cmo-clients__row">
                {group.items.map((client) => (
                  <li key={client.name} className="cmo-clients__cell">
                    {client.file ? (
                      <Image
                        src={client.file}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className="cmo-clients__logo"
                      />
                    ) : (
                      <span className="cmo-clients__name">{client.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="cmo-volume">
            <p className="cmo-volume__label">{config.volume.label}</p>
            <ul className="cmo-volume__grid">
              {monthlyScale.map((item) => (
                <li key={item.value} className="cmo-volume__item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="cmo-volume__text">{config.volume.note}</p>
          </div>
        </div>
      </section>

      {/* --- Триггеры --- */}
      <section className="section">
        <SectionHeading
          eyebrow={config.triggers.eyebrow}
          title={config.triggers.title}
          description={config.triggers.description}
        />
        <div className="cards-grid-3 cards-grid-3--tight">
          {config.triggers.items.map((item) => (
            <GlowCard key={item.title} className="principle-card">
              {item.num ? (
                <div className="principle-card__num" aria-hidden="true">
                  {item.num}
                </div>
              ) : null}
              <h3 className="principle-card__title">{item.title}</h3>
              <p className="principle-card__text">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* --- Зона ответственности --- */}
      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow={config.scope.eyebrow}
            title={config.scope.title}
            description={config.scope.description}
          />
          <div className="cards-grid-3 cards-grid-3--tight">
            {config.scope.items.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Якорный блок под профильный трафик --- */}
      <section className="section" id={config.focus.anchor}>
        <SectionHeading
          eyebrow={config.focus.eyebrow}
          title={config.focus.title}
          description={config.focus.description}
        />
        <div className="cards-grid-2 cmo-ads-grid">
          {config.focus.tracks.map((track) => (
            <GlowCard key={track.title} className="cmo-track">
              <div className="cmo-track__head">
                <h3 className="cmo-track__title">{track.title}</h3>
                <span className="cmo-track__note">{track.note}</span>
              </div>
              <ul className="cmo-track__list">
                {track.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>

        {config.focus.report ? (
          <figure className="cmo-report">
            <div className="cmo-report__card">
              <div className="cmo-report__head">
                <span className="cmo-report__dot" aria-hidden="true" />
                <span className="cmo-report__title">{config.focus.report.title}</span>
                <span className="cmo-report__tag">схема</span>
              </div>
              <div className="cmo-report__rows">
                {config.focus.report.rows.map((row) => (
                  <div key={row.label} className="cmo-report__row">
                    <span className="cmo-report__label">{row.label}</span>
                    <div className="cmo-report__bar" aria-hidden="true">
                      <span style={{ width: row.fill }} />
                    </div>
                    <span className="cmo-report__hint">{row.hint}</span>
                  </div>
                ))}
              </div>
              <p className="cmo-report__foot">{config.focus.report.foot}</p>
            </div>
            <figcaption>{config.focus.report.caption}</figcaption>
          </figure>
        ) : null}

        <p className="cmo-callout">
          <strong>{config.focus.callout.strong}</strong> {config.focus.callout.text}
        </p>
      </section>

      {/* --- Сравнение --- */}
      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading
            eyebrow={config.comparison.eyebrow}
            title={config.comparison.title}
            description={config.comparison.description}
          />
          <div className="cmo-table-wrap">
            <table className="cmo-table">
              <caption className="sr-only">{config.comparison.title}</caption>
              <thead>
                <tr>
                  <th scope="col">Критерий</th>
                  {config.comparison.data.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      data-highlight={
                        index === config.comparison.data.columns.length - 1 ? "true" : undefined
                      }
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {config.comparison.data.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${index}`}
                        data-label={config.comparison.data.columns[index]}
                        data-highlight={index === row.values.length - 1 ? "true" : undefined}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {config.comparison.data.note ? (
            <p className="cmo-table-note">{config.comparison.data.note}</p>
          ) : null}
        </div>
      </section>

      {/* --- Этапы --- */}
      <section className="section">
        <SectionHeading eyebrow={config.stages.eyebrow} title={config.stages.title} />
        <ol className="cmo-stages">
          {config.stages.items.map((stage) => (
            <li key={stage.num} className="cmo-stage">
              <div className="cmo-stage__aside">
                <span className="cmo-stage__num">{stage.num}</span>
                <span className="cmo-stage__period">{stage.period}</span>
              </div>
              <div className="cmo-stage__body">
                <h3 className="cmo-stage__title">{stage.title}</h3>
                <p className="cmo-stage__text">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* --- Отзывы --- */}
      {config.testimonials ? (
        <section className="section section--muted">
          <div className="section__inner">
            <SectionHeading
              eyebrow={config.testimonials.eyebrow}
              title={config.testimonials.title}
            />
            <div className="cards-grid-3 cards-grid-3--tight">
              {config.testimonials.items.map((item) => (
                <GlowCard key={item.author} className="cmo-quote">
                  {item.placeholder ? (
                    <span className="cmo-quote__flag">заглушка — заменить</span>
                  ) : null}
                  <p className="cmo-quote__text">{item.text}</p>
                  <div className="cmo-quote__meta">
                    <strong>{item.author}</strong>
                    <span>{item.role}</span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* --- Кейсы --- */}
      <section className="section">
        <SectionHeading
          eyebrow={config.cases.eyebrow}
          title={config.cases.title}
          description={config.cases.description}
        />
        <div className="cards-grid-3 cards-grid-3--tight">
          {siteConfig.featuredCases.map((item) => (
            <GlowCard key={item.title} className="case-card">
              <p className="case-card__industry">{item.industry}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="case-card__result">
                {item.result} <span>{item.resultNote}</span>
              </div>
            </GlowCard>
          ))}
        </div>
        <div className="cmo-links">
          <Link href="/portfolio" className="button button--secondary">
            Все кейсы
          </Link>
          <Link href="/about" className="button button--secondary">
            Подробно обо мне
          </Link>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="section section--muted">
        <div className="section__inner">
          <SectionHeading eyebrow={config.faq.eyebrow} title={config.faq.title} />
          <dl className="faq-list">
            {config.faq.items.map((item) => (
              <div key={item.question} className="faq-list__item">
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --- Заявка --- */}
      <section className="section cmo-lead-section" id="zayavka">
        <div className="cmo-lead__video" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="none" poster="/media/cta-network-poster.webp">
            <source src="/media/cta-network.webm" type="video/webm" />
            <source src="/media/cta-network.mp4" type="video/mp4" />
          </video>
          <div className="cmo-lead__veil" />
        </div>
        <div className="section__inner cmo-lead">
          <div className="cmo-lead__copy">
            <SectionHeading
              eyebrow={config.lead.eyebrow}
              title={config.lead.title}
              description={config.lead.description}
            />
            <ul className="cmo-lead__list">
              {config.lead.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="cmo-lead__direct">
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>{siteConfig.phone}</a>
              <a href={siteConfig.telegram} target="_blank" rel="noreferrer">
                Telegram {siteConfig.telegramHandle}
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="cmo-lead__form">
            <ContactForm
              withPhone
              submitLabel={config.lead.submitLabel}
              messageLabel={config.lead.messageLabel}
              goal={metrikaGoals.cmoForm}
            />
          </div>
        </div>
      </section>
    </>
  );
}
