/**
 * Тип конфигурации нишевой посадочной.
 *
 * Одна ниша = один объект такого вида + шестистрочный файл маршрута в
 * app/{slug}/page.tsx. Вёрстку править не нужно: всё рисует
 * <NicheLanding config={...} /> из components/niche-landing.tsx.
 *
 * Как добавить нишу:
 *   1. Создать lib/niches/{slug}.ts с объектом NicheLandingConfig
 *   2. Создать app/{path}/page.tsx на три импорта
 *   3. Дописать путь в app/sitemap.ts и seoHubPages в lib/site-config.ts
 */

export type NicheStat = { value: string; label: string };

export type NicheCard = { num?: string; title: string; text: string };

export type NicheTrack = { title: string; note: string; items: string[] };

export type NicheStage = {
  num: string;
  period: string;
  title: string;
  text: string;
};

export type NicheFaq = { question: string; answer: string };

export type NicheComparison = {
  columns: string[];
  rows: Array<{ label: string; values: string[] }>;
  note?: string;
};

/**
 * Отзыв. Пока настоящих нет — блок рендерится с пометкой-заглушкой,
 * чтобы дизайнер видел композицию. Выдуманные отзывы на живой сайт не
 * ставим: это обман посетителя, пришедшего с рекламы.
 */
export type NicheTestimonial = {
  text: string;
  author: string;
  role: string;
  /** true — рыба для вёрстки, на публикацию не идёт без замены. */
  placeholder?: boolean;
};

export type NicheLandingConfig = {
  /** Путь без слеша на конце, например "/marketing-dlya-zastroyshchikov". */
  path: string;

  meta: { title: string; description: string };

  /** Хлебные крошки: короткое имя страницы. */
  breadcrumb: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    /** Подпись под портретом. */
    nameplate: string;
    /** Бейдж поверх фото. */
    badge: NicheStat;
  };

  proofPoints: NicheStat[];

  /** Ключ группы клиентов, которую показать первой. */
  primaryClientGroup?: string;

  /** Заголовок и пояснение к блоку суммарных цифр. */
  volume: { label: string; note: string };

  triggers: { eyebrow: string; title: string; description?: string; items: NicheCard[] };

  scope: { eyebrow: string; title: string; description?: string; items: NicheCard[] };

  /** Якорный блок под профильный трафик (например, контекстная реклама). */
  focus: {
    anchor: string;
    eyebrow: string;
    title: string;
    description: string;
    tracks: NicheTrack[];
    /** Схема отчёта: подписи строк. */
    report?: { title: string; rows: Array<{ label: string; fill: string; hint: string }>; foot: string; caption: string };
    callout: { strong: string; text: string };
  };

  comparison: { eyebrow: string; title: string; description?: string; data: NicheComparison };

  stages: { eyebrow: string; title: string; items: NicheStage[] };

  testimonials?: { eyebrow: string; title: string; items: NicheTestimonial[] };

  cases: { eyebrow: string; title: string; description?: string };

  faq: { eyebrow: string; title: string; items: NicheFaq[] };

  lead: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    submitLabel: string;
    messageLabel: string;
  };
};
