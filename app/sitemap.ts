import type { MetadataRoute } from "next";

import { getAllBlogPosts, getAllCaseStudies } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.baseUrl}/ai-agenty`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/optimizaciya-biznes-processov`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.baseUrl}/ai-avtomatizaciya-marketinga`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.baseUrl}/ai-dlya-prodazh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const casePages = getAllCaseStudies().map((item) => ({
    url: `${siteConfig.baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = getAllBlogPosts().map((item) => ({
    url: `${siteConfig.baseUrl}/blog/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...casePages, ...blogPages];
}
