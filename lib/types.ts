export type SeoFields = {
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  eyebrowLive: string;
  titleLines: Array<{ text: string; variant?: "accent" | "muted" }>;
  subtitle: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type Principle = {
  num: string;
  icon: string;
  title: string;
  text: string;
};

export type SystemMetric = {
  value: string;
  label: string;
};

export type SystemCard = {
  tag: string;
  title: string;
  description: string;
  metrics: SystemMetric[];
};

export type FeaturedCase = {
  industry: string;
  title: string;
  description: string;
  result: string;
  resultNote: string;
};

export type StatRow = {
  value: string;
  title: string;
  sub: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  vk: string;
  instagram: string;
  baseUrl: string;
  tagline: string;
  hero: HeroContent;
  tickerItems: string[];
  principles: Principle[];
  systems: SystemCard[];
  featuredCases: FeaturedCase[];
  aboutKicker: string;
  aboutTitleLines: string[];
  aboutBody: Array<{ text: string }>;
  aboutChips: string[];
  statRows: StatRow[];
  ctaLabel: string;
  ctaTitleLines: Array<{ text: string; variant?: "accent" }>;
  ctaSub: string;
  seo: SeoFields;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  deliverables: string[];
  timeline: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  cover: string;
  seo: SeoFields;
  client: string;
  problem: string;
  solution: string;
  result: string;
  services: string[];
  content: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  cover: string;
  seo: SeoFields;
  tags: string[];
  readingTime: string;
  content: string;
};
