import Link from "next/link";

import { BlogCard, CaseCard, ServiceCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { getAllBlogPosts, getAllCaseStudies } from "@/lib/content";
import { services, siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const caseStudies = getAllCaseStudies().slice(0, 2);
  const posts = getAllBlogPosts().slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">{siteConfig.hero.eyebrow}</p>
            <h1>{siteConfig.hero.title}</h1>
            <p className="hero__description">{siteConfig.hero.description}</p>

            <div className="hero__actions">
              <Link href={siteConfig.hero.primaryCta.href} className="button button--primary">
                {siteConfig.hero.primaryCta.label}
              </Link>
              <Link href={siteConfig.hero.secondaryCta.href} className="button button--ghost">
                {siteConfig.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel__kicker">Что получает клиент</p>
            <ul>
              <li>понятную цифровую подачу и собранное позиционирование</li>
              <li>сайт, который помогает продавать, а не просто существует</li>
              <li>рабочую систему роста: контент, поддержка, SEO, реклама и CRM-логика</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stats-grid">
          {siteConfig.stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split-block">
          <SectionHeading
            eyebrow="Подход"
            title="Собираю не просто страницы, а рабочую digital-среду для доверия, входящих запросов и роста."
            description="Подключаюсь там, где нужно связать сайт, контент, маркетинг и дальнейшее развитие в один управляемый контур."
          />

          <div className="bullet-stack">
            {siteConfig.audience.map((item) => (
              <article key={item} className="soft-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeading
            eyebrow="Услуги"
            title="От позиционирования до запуска сайта и дальнейшей digital-поддержки"
            description="Можно начать с компактного запуска, а дальше постепенно наращивать контент, трафик и точки продаж."
          />

          <div className="card-grid card-grid--three">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Избранные кейсы"
            title="Проекты, где сайт и digital становятся частью реальной работы бизнеса"
            description="Здесь не витринные концепты, а практические проекты: поддержка, запуск, систематизация и рабочая цифровая подача."
          />

          <div className="card-grid">
            {caseStudies.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeading eyebrow="Подход" title="Что важно в моей работе с проектами" />

          <div className="card-grid">
            {siteConfig.testimonials.map((item) => (
              <article key={item.author} className="card quote-card">
                <p className="quote-card__text">“{item.quote}”</p>
                <p className="quote-card__author">
                  {item.author} • {item.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Из блога"
            title="Пишу о сайтах, кейсах и о том, как собирать digital не кусками, а как систему"
          />

          <div className="card-grid">
            {posts.map((item) => (
              <BlogCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
