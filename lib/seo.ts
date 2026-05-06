import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import type { BlogPost, CaseStudy } from "@/lib/types";

const OG_IMAGE_PATH = "/og-cover.jpg";
const PERSON_IMAGE_PATH = "/foto-pavel.jpg";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialDescription?: string;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
  };
};

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(normalizePath(path), siteConfig.baseUrl).toString();
}

export function siteEntityIds() {
  const base = siteConfig.baseUrl.replace(/\/$/, "");
  return {
    person: `${base}/#person`,
    website: `${base}/#website`,
  };
}

function resolveSocialTitle(title: string) {
  return title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
  article,
}: BuildPageMetadataInput): Metadata {
  const normalizedPath = normalizePath(path);
  const url = absoluteUrl(normalizedPath);
  const ogTitle = socialTitle ?? resolveSocialTitle(title);
  const ogDescription = socialDescription ?? description;

  const ogImages = [
    {
      url: absoluteUrl(OG_IMAGE_PATH),
      width: 1200,
      height: 630,
      alt: "Павел Фролов — маркетолог и AI-архитектор",
    },
  ];

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type: article ? "article" : "website",
      url,
      title: ogTitle,
      description: ogDescription,
      locale: "ru_RU",
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            ...(article.tags && article.tags.length > 0 ? { tags: article.tags } : {}),
          }
        : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [absoluteUrl(OG_IMAGE_PATH)],
    },
  };
}

export function buildSiteJsonLdGraph() {
  const ids = siteEntityIds();

  const person = {
    "@type": "Person",
    "@id": ids.person,
    name: "Павел Фролов",
    jobTitle: "AI-архитектор, внедрение AI-агентов под ключ",
    url: siteConfig.baseUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(PERSON_IMAGE_PATH),
    },
    description:
      "Внедрение AI-агентов под ключ для бизнеса. 19 лет в маркетинге и системной архитектуре.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Новосибирск",
      addressCountry: "RU",
    },
    sameAs: [
      siteConfig.telegram,
      siteConfig.vk,
      siteConfig.instagram,
      siteConfig.whatsapp,
    ],
    knowsAbout: [
      "AI-агенты для бизнеса",
      "внедрение искусственного интеллекта",
      "маркетинговая автоматизация",
      "CRM и интеграции",
      "оркестрация AI-систем",
      "Яндекс Директ",
      "лидогенерация B2B",
    ],
  };

  const webSite = {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteConfig.baseUrl,
    name: siteConfig.seo.title,
    description: siteConfig.seo.description,
    publisher: { "@id": ids.person },
    inLanguage: "ru-RU",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webSite, person],
  };
}

export function buildAiAgentsLandingSchema() {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Внедрение AI-агентов под ключ",
    description:
      "Аудит процессов, пилот одного AI-агента, система агентов с интеграциями. Для владельцев бизнеса с выручкой порядка 50–500 млн ₽/год.",
    url: absoluteUrl("/ai-agenty"),
    provider: { "@id": ids.person },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    serviceType: "Консалтинг и внедрение AI-агентов в операционные процессы",
  };
}

export function buildServiceSchema() {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Услуги — аудит процессов, пилот AI-агента, система агентов",
    serviceType: "Маркетинговый консалтинг и AI-автоматизация бизнес-процессов",
    url: absoluteUrl("/services"),
    provider: { "@id": ids.person },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildBlogPostSchema(post: BlogPost) {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${absoluteUrl(`/blog/${post.slug}`)}#webpage`,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(OG_IMAGE_PATH),
    },
    keywords: post.tags.join(", "),
    articleSection: "Блог",
    inLanguage: "ru-RU",
  };
}

export function buildCaseStudySchema(item: CaseStudy) {
  const ids = siteEntityIds();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    headline: item.title,
    description: item.seo.description,
    url: absoluteUrl(`/portfolio/${item.slug}`),
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    author: { "@id": ids.person },
    creator: { "@id": ids.person },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(OG_IMAGE_PATH),
    },
    about: item.client,
    keywords: item.services.join(", "),
    inLanguage: "ru-RU",
  };
}
