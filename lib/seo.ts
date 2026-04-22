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

function resolveSocialTitle(title: string) {
  return title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
}: BuildPageMetadataInput): Metadata {
  const normalizedPath = normalizePath(path);
  const url = absoluteUrl(normalizedPath);
  const ogTitle = socialTitle ?? resolveSocialTitle(title);
  const ogDescription = socialDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type: "website",
      url,
      title: ogTitle,
      description: ogDescription,
      locale: "ru_RU",
      images: [
        {
          url: absoluteUrl(OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: "Павел Фролов — маркетолог и AI-архитектор",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [absoluteUrl(OG_IMAGE_PATH)],
    },
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Павел Фролов",
    jobTitle: "Маркетолог-стратег, AI-архитектор",
    url: siteConfig.baseUrl,
    image: absoluteUrl(PERSON_IMAGE_PATH),
    description: "Маркетолог с 19 лет опытом. Проектирую AI-системы для маркетинга.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Новосибирск",
      addressCountry: "RU",
    },
    sameAs: [siteConfig.telegram],
    knowsAbout: [
      "AI-маркетинг",
      "Яндекс Директ",
      "контекстная реклама",
      "маркетинговая автоматизация",
    ],
  };
}

export function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Маркетинговый консалтинг и AI-автоматизация",
    provider: {
      "@type": "Person",
      name: "Павел Фролов",
      url: siteConfig.baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
  };
}

function buildAuthorPerson() {
  return {
    "@type": "Person",
    name: "Павел Фролов",
    url: siteConfig.baseUrl,
  };
}

export function buildBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: buildAuthorPerson(),
    publisher: buildAuthorPerson(),
    image: absoluteUrl(OG_IMAGE_PATH),
    keywords: post.tags.join(", "),
    articleSection: "Блог",
    inLanguage: "ru-RU",
  };
}

export function buildCaseStudySchema(item: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    headline: item.title,
    description: item.seo.description,
    url: absoluteUrl(`/portfolio/${item.slug}`),
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    author: buildAuthorPerson(),
    creator: buildAuthorPerson(),
    image: absoluteUrl(OG_IMAGE_PATH),
    about: item.client,
    keywords: item.services.join(", "),
    inLanguage: "ru-RU",
  };
}
