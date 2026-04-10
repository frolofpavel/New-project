export type SeoFields = {
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
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
  hero: HeroContent;
  stats: Array<{
    value: string;
    label: string;
  }>;
  audience: string[];
  testimonials: Array<{
    author: string;
    role: string;
    quote: string;
  }>;
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
