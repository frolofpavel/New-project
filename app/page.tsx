import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { HeroBlock } from "@/components/hero-block";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { CountUp } from "@/components/motion/count-up";
import { GlowCard } from "@/components/motion/glow-card";
import { HugeMarquee } from "@/components/motion/huge-marquee";
import { MagneticLink } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata, buildPersonSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  path: "/",
  socialTitle: siteConfig.seo.title,
  socialDescription: "Павел Фролов — маркетолог-стратег с 19 лет опытом. Проектирую AI-системы для маркетинга.",
});

function renderBody(markdown: string) {
  const parts: Array<string | { type: "strong" | "hl"; text: string }> = [];
  const regex = /\*\*([^*]+)\*\*|__([^_]+)__/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown))) {
    if (match.index > lastIndex) {
      parts.push(markdown.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push({ type: "strong", text: match[1] });
    } else if (match[2]) {
      parts.push({ type: "hl", text: match[2] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markdown.length) {
    parts.push(markdown.slice(lastIndex));
  }
  return parts.map((part, i) => {
    if (typeof part === "string") return <span key={i}>{part}</span>;
    if (part.type === "strong") return <strong key={i}>{part.text}</strong>;
    return (
      <strong key={i} className="hl">
        {part.text}
      </strong>
    );
  });
}

export default function HomePage() {
  return (
    <>
      <HeroBlock />
      <Script id="person-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildPersonSchema())}
      </Script>

      {/* ══ HUGE MARQUEE — двунаправленный ══ */}
      <section className="huge-marquee-block">
        <HugeMarquee
          items={["SYSTEMS NOT CAMPAIGNS", "AI · OPERATIONS", "ARCHITECTURE FIRST", "FROLOV.PF"]}
          direction="left"
          duration={38}
          variant="solid"
        />
        <HugeMarquee
          items={["МАРКЕТИНГ КАК СИСТЕМА", "19 ЛЕТ ОПЫТА", "B2B · LEADGEN", "AIOS · AI-BOS"]}
          direction="right"
          duration={46}
          variant="outline"
        />
      </section>

      {/* ══ TICKER ══ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...siteConfig.tickerItems, ...siteConfig.tickerItems, ...siteConfig.tickerItems].map((item, i) => (
            <span key={`${item}-${i}`} className="ticker__item">
              <span className="tick-arrow">↗</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ПРИНЦИПЫ ══ */}
      <section id="principles" className="section">
        <Reveal>
          <div className="section-label">Принципы</div>
          <AnimatedHeading className="section-h2" lines={["Как я думаю", "о маркетинге"]} />
          <p className="section-sub">
            Не «делаю рекламу» — строю машины, которые работают без тебя. Вот база.
          </p>
        </Reveal>

        <Stagger className="principles-grid">
          {siteConfig.principles.map((p) => (
            <StaggerItem key={p.num}>
              <GlowCard className="principle-card">
                <div className="principle-card__num">{p.num}</div>
                <div className="principle-card__icon" aria-hidden="true">
                  {p.icon}
                </div>
                <h3 className="principle-card__title">{p.title}</h3>
                <p className="principle-card__text">{p.text}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ══ СИСТЕМЫ ══ */}
      <section id="systems" className="section--muted has-bg-video">
        <div className="bg-video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/systems-isometric-poster.webp"
          >
            <source src="/media/systems-isometric.webm" type="video/webm" />
            <source src="/media/systems-isometric.mp4" type="video/mp4" />
          </video>
          <div className="bg-video__veil" />
        </div>
        <div className="section__inner">
          <Reveal>
            <div className="section-label">Системы</div>
            <AnimatedHeading className="section-h2" lines={["Что я строю"]} />
            <p className="section-sub">
              Собственные AI-продукты и системы под задачи клиентов. Всё работает в production.
            </p>
          </Reveal>

          <div className="systems-scroll">
            <Stagger className="systems-cards-track" stagger={0.1}>
              {siteConfig.systems.map((s) => (
                <StaggerItem key={s.title}>
                  <GlowCard className="system-card">
                    <span className="system-card__tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <div className="system-card__metrics">
                      {s.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="metric__val">
                            <CountUp value={m.value} />
                          </span>
                          <span className="metric__lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ══ AI SHOWCASE ══ */}
      <section id="ai-showcase" className="section">
        <div className="ai-showcase">
          <Reveal>
            <div className="ai-showcase__copy">
              <div className="section-label">AI в работе</div>
              <AnimatedHeading
                className="section-h2"
                lines={["Не только тексты.", "AI может показывать продукт."]}
              />
              <p className="section-sub ai-showcase__sub">
                Использую генеративный AI не как игрушку, а как рабочий слой для
                презентаций, концептов, прототипов и клиентских материалов.
                Ниже — пример визуала, который можно быстро встроить в
                маркетинговую подачу.
              </p>

              <div className="ai-showcase__points">
                <div className="ai-showcase__point">
                  <span className="ai-showcase__point-num">01</span>
                  <p>
                    Быстрая упаковка идеи в наглядный визуальный артефакт без
                    долгого продакшна.
                  </p>
                </div>
                <div className="ai-showcase__point">
                  <span className="ai-showcase__point-num">02</span>
                  <p>
                    Полезно для КП, посадочных, презентаций, рекламных креативов
                    и теста визуальных гипотез.
                  </p>
                </div>
                <div className="ai-showcase__point">
                  <span className="ai-showcase__point-num">03</span>
                  <p>
                    Дальше это можно докручивать в полноценную систему:
                    оффер, сценарий, лендинг, автоворонка и AI-операции вокруг.
                  </p>
                </div>
              </div>


              <div className="ai-showcase__caption" hidden>
                <span className="ai-showcase__caption-tag">SuperGrok onboarding</span>
                <p>
                  Р•С‰С‘ РѕРґРёРЅ С„РѕСЂРјР°С‚ РїРѕРґР°С‡Рё: РёРЅС‚РµСЂС„РµР№СЃРЅР°СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёСЏ,
                  РєРѕС‚РѕСЂСѓСЋ РјРѕР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєР°Рє СЂРµС„РµСЂРµРЅСЃ РґР»СЏ РљРџ,
                  РѕРЅР±РѕСЂРґРёРЅРіР° РёР»Рё РїСЂРѕРґСѓРєС‚РѕРІС‹С… СЃС†РµРЅР°СЂРёРµРІ СЃ AI.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="ai-showcase__media">
              <div className="ai-showcase__frame">
                <video
                  className="ai-showcase__video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/media/kling-ai-showcase.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="ai-showcase__caption">
                <span className="ai-showcase__caption-tag">Пример AI-визуала</span>
                <p>
                  Видео встроено как живой пример того, как AI можно использовать
                  в клиентской коммуникации и упаковке идеи.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ КЕЙСЫ ══ */}
      <section id="cases" className="section">
        <Reveal>
          <div className="section-label">Кейсы</div>
          <AnimatedHeading className="section-h2" lines={["Реальные результаты"]} />
          <p className="section-sub">
            Не «увеличили охваты», а конкретные числа в деньгах и лидах.
          </p>
        </Reveal>

        <Stagger className="cards-grid-3" stagger={0.12}>
          {siteConfig.featuredCases.map((c) => (
            <StaggerItem key={c.title}>
              <GlowCard className="case-card">
                <p className="case-card__industry">{c.industry}</p>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className="case-card__result">
                  <CountUp value={c.result} /> <span>{c.resultNote}</span>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ══ ОБО МНЕ ══ */}
      <section id="about" className="section--muted">
        <div className="about-inner">
          <Reveal>
            <div className="section-label">{siteConfig.aboutKicker}</div>
            <AnimatedHeading className="section-h2" lines={siteConfig.aboutTitleLines} />
            <div className="about-body">
              {siteConfig.aboutBody.map((p, i) => (
                <p key={i}>{renderBody(p.text)}</p>
              ))}
            </div>
            <div className="about-chips">
              {siteConfig.aboutChips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="about-portrait-wrap">
              <div className="about-portrait">
                <Image
                  src="/images/pavel-formal.jpg"
                  alt="Павел Фролов — маркетолог и AI-архитектор"
                  width={440}
                  height={540}
                  className="about-portrait__img"
                />
                <div className="about-portrait__veil" />
              </div>

              {/* Floating stat badges */}
              <div className="about-badge about-badge--bl">
                <span className="about-badge__num">19+</span>
                <span className="about-badge__label">лет в маркетинге</span>
              </div>
              <div className="about-badge about-badge--br">
                <span className="about-badge__num">50M₽</span>
                <span className="about-badge__label">в управлении</span>
              </div>
              <div className="about-badge about-badge--tr">
                <span className="about-badge__num">300%</span>
                <span className="about-badge__label">ROMI средний</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-beam" aria-hidden="true">
        <div className="section-beam__line" />
        <div className="section-beam__pulse" />
      </div>

      {/* ══ CTA ══ */}
      <section id="contact-cta" className="cta-section">
        <div className="cta-section__video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/cta-network-poster.webp"
          >
            <source src="/media/cta-network.webm" type="video/webm" />
            <source src="/media/cta-network.mp4" type="video/mp4" />
          </video>
          <div className="cta-section__veil" />
        </div>

        <div className="cta-section__body">
          <Reveal>
            <div className="cta-section__label">{siteConfig.ctaLabel}</div>
            <h2 className="cta-section__h2">
              {siteConfig.ctaTitleLines.map((line, i) => (
                <span key={i} className={line.variant === "accent" ? "accent" : undefined}>
                  {line.text}
                  {i < siteConfig.ctaTitleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="cta-section__sub">{siteConfig.ctaSub}</p>

            <div className="cta-section__btns">
              <MagneticLink href={siteConfig.telegram} className="button button--primary" external>
                → написать в Telegram
              </MagneticLink>
              <Link href={`mailto:${siteConfig.email}`} className="button button--secondary">
                {siteConfig.email}
              </Link>
            </div>

            <div className="cta-section__links">
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="cta-section__link">
                <span aria-hidden="true">📞</span>
                <span>{siteConfig.phone}</span>
              </a>
              <Link href="/contact" className="cta-section__link">
                <span aria-hidden="true">✉️</span>
                <span>Форма на странице контактов</span>
              </Link>
              <Link href="/portfolio" className="cta-section__link">
                <span aria-hidden="true">📁</span>
                <span>Смотреть кейсы</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
