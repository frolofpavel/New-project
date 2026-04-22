import Image from "next/image";
import type { Metadata } from "next";

import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const focusCards = [
  {
    title: "Маркетинг как система",
    text: "Собираю в одну архитектуру продукт, воронку, каналы, аналитику и операционный ритм команды. Не запускаю рекламу отдельно от бизнеса.",
  },
  {
    title: "AI как рабочий слой",
    text: "Проектирую агентов и автоматизации там, где рутина съедает деньги: квалификация лидов, отчёты, сегментация, первичный контакт, контроль задач.",
  },
  {
    title: "Результат в цифрах",
    text: "Смотрю не на лайки и CTR, а на CPL, ROMI, выручку, скорость реакции команды и устойчивость всей системы в длинном цикле.",
  },
];

const workModes = [
  "Архитектура маркетинга под ключ",
  "Аудит действующей воронки и каналов",
  "AI-автоматизация маркетинговых процессов",
  "Операционное сопровождение как fractional CMO",
];

const timeline = [
  {
    period: "19 лет",
    title: "Маркетинг и управленка",
    text: "Прошёл путь от специалиста до CMO: бюджеты до 50 млн ₽ в месяц, команды до 12 человек, выходы в новые рынки и перезапуски действующего бизнеса.",
  },
  {
    period: "Последние 3 года",
    title: "Собственные AI-системы",
    text: "Параллельно с маркетингом разрабатываю AIOS и AI-BOS: рабочие операционные системы на Claude, Google Sheets, Telegram, API и агентной логике.",
  },
  {
    period: "Сейчас",
    title: "Стык стратегии и реализации",
    text: "Моя сильная зона — связать маркетинговую стратегию с реальными автоматизациями, чтобы система жила не на презентации, а в ежедневной работе.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Обо мне",
  description:
    "Павел Фролов — CMO, который умеет в код. 19 лет в маркетинге, 200+ проектов, автор AI-операционной системы для агентств.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-page-hero">
        <div className="about-page-hero__grid">
          <SectionHeading
            as="h1"
            eyebrow="Обо мне"
            title="Строю маркетинговые системы, которые умеют работать без ручного управления"
            description={`${siteConfig.role}. 19 лет в маркетинге, последние 3 года — в AI-системах и автоматизации. ${siteConfig.location}.`}
          />

          <div className="about-page-hero__panel">
            <p className="about-page-hero__panel-label">Позиционирование</p>
            <p className="about-page-hero__panel-text">
              Я не про «настроить рекламу». Я про то, чтобы собрать цельную
              систему: продукт, каналы, данные, AI-слой и ежедневные процессы
              команды в один работающий контур.
            </p>

            <div className="about-page-hero__stats">
              {siteConfig.statRows.slice(0, 3).map((row) => (
                <div key={row.title} className="about-page-hero__stat">
                  <span className="about-page-hero__stat-value">{row.value}</span>
                  <span className="about-page-hero__stat-label">{row.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="about-story-grid">
          <div className="about-story-media">
            <div className="about-portrait-wrap about-story-portrait-wrap">
              <div className="about-portrait about-story-portrait">
                <Image
                  src="/images/pavel-about-2026.png"
                  alt="Павел Фролов — маркетолог и AI-архитектор"
                  width={2048}
                  height={1152}
                  priority
                  className="about-portrait__img about-story-portrait__img"
                />
                <div className="about-portrait__veil about-story-portrait__veil" />
              </div>

              <div className="about-badge about-badge--bl">
                <span className="about-badge__num">19+</span>
                <span className="about-badge__label">лет в маркетинге</span>
              </div>
              <div className="about-badge about-badge--br">
                <span className="about-badge__num">50M₽</span>
                <span className="about-badge__label">бюджет под управлением</span>
              </div>
              <div className="about-badge about-badge--tr">
                <span className="about-badge__num">AIOS</span>
                <span className="about-badge__label">AI-системы в production</span>
              </div>
            </div>

            <div className="about-story-note">
              <p className="about-story-note__title">Как я обычно вхожу в задачу</p>
              <p className="about-story-note__text">
                Сначала разбираю, где бизнес теряет деньги или скорость. Потом
                собираю архитектуру: оффер, воронка, каналы, аналитика, AI и
                операционный цикл команды.
              </p>
            </div>
          </div>

          <div className="about-story-copy">
            <div className="about-story-copy__intro">
              <span className="about-story-copy__eyebrow">Профиль</span>
              <h2>CMO-мышление + hands-on реализация</h2>
            </div>

            <div className="about-story-copy__body">
              <p>
                Занимаюсь маркетингом <strong>19 лет</strong>. Вырос от
                специалиста до CMO, запускал новые направления, пересобирал
                команды, управлял бюджетами <strong>до 50 млн ₽/мес</strong> и
                строил процессы так, чтобы результат держался не один месяц, а
                годами.
              </p>
              <p>
                Последние <strong>3 года</strong> параллельно создаю
                собственные AI-системы. Сначала для себя, потом для агентства.
                Поэтому могу не только придумать стратегию, но и сразу
                превратить её в рабочую логику: агенты, автоматизации,
                регламенты, связки с CRM и Telegram.
              </p>
              <p>
                В работе мне важен не красивый отчёт, а ощущение, что бизнес
                начал двигаться быстрее: лиды приходят стабильнее, команда
                меньше тонет в рутине, решения принимаются на данных, а не на
                интуиции.
              </p>
            </div>

            <div className="about-chips">
              {siteConfig.aboutChips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>

            <div className="about-story-copy__stack">
              {focusCards.map((card) => (
                <article key={card.title} className="about-focus-card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted about-proof-section">
        <div className="section__inner">
          <div className="about-proof-grid">
            <div>
              <p className="section-label">Как работаю</p>
              <h2 className="section-h2">Не кампаниями. Контурами.</h2>
              <p className="section-sub">
                Подключаюсь туда, где нужен не подрядчик на один канал, а
                человек, который может собрать и удержать маркетинговую систему
                целиком.
              </p>
            </div>

            <div className="about-proof-card">
              <p className="about-proof-card__eyebrow">Форматы работы</p>
              <ul className="about-proof-list">
                {workModes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-timeline">
            {timeline.map((item) => (
              <article key={item.title} className="about-timeline__item">
                <div className="about-timeline__period">{item.period}</div>
                <div className="about-timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="article-layout about-page-bottom">
          <div className="prose">
            <h2>Что получает бизнес от работы со мной</h2>
            <p>
              Не просто список гипотез и не отдельный рекламный кабинет.
              Получает систему, где видно: кто целевая аудитория, как устроен
              оффер, откуда приходят лиды, где теряются деньги, что можно
              автоматизировать уже сейчас и какие шаги реально двигают выручку.
            </p>
            <p>
              Если задача требует ежедневного управления, могу заходить как
              fractional CMO или как архитектор, который собирает контур и
              передаёт его команде. Если нужен AI-слой, проектирую его так,
              чтобы автоматизации были встроены в операционку, а не висели
              красивой надстройкой поверх хаоса.
            </p>

            <h2>Где я особенно полезен</h2>
            <ul>
              <li>когда маркетинг уже есть, но он распадается на куски;</li>
              <li>
                когда нужно связать стратегию, аналитику, каналы и команду в
                одну систему;
              </li>
              <li>
                когда бизнесу пора внедрять AI не ради моды, а ради скорости и
                маржинальности;
              </li>
              <li>
                когда нужен партнёр, который одинаково понимает и маркетинг, и
                техническую реализацию.
              </li>
            </ul>
          </div>

          <aside className="aside-card about-facts-card">
            <p className="aside-card__eyebrow">Быстрые факты</p>
            <ul>
              {siteConfig.statRows.map((row) => (
                <li key={row.title}>
                  <strong>{row.value}</strong> — {row.title}
                  <span>{row.sub}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
