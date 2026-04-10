import type { MetadataRoute } from "next";

import { getAllBlogPosts, getAllCaseStudies } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/services", "/portfolio", "/blog", "/contact"].map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const casePages = getAllCaseStudies().map((item) => ({
    url: `${siteConfig.baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(item.publishedAt),
  }));

  const blogPages = getAllBlogPosts().map((item) => ({
    url: `${siteConfig.baseUrl}/blog/${item.slug}`,
    lastModified: new Date(item.publishedAt),
  }));

  return [...staticPages, ...casePages, ...blogPages];
}
