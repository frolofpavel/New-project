import type { MetadataRoute } from "next";



import { getAllCaseStudies, getIndexedBlogPosts } from "@/lib/content";

import { siteConfig } from "@/lib/site-config";



export const dynamic = "force-static";



function sitemapUrl(path: string) {

  if (!path || path === "/") {

    return `${siteConfig.baseUrl}/`;

  }



  const normalized = path.startsWith("/") ? path : `/${path}`;

  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;

  return `${siteConfig.baseUrl}${withSlash}`;

}



export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [

    {

      url: sitemapUrl("/"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 1,

    },

    {

      url: sitemapUrl("/ai-agenty"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.95,

    },

    {

      url: sitemapUrl("/direktor-po-marketingu"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.95,

    },

    {

      url: sitemapUrl("/marketing-dlya-zastroyshchikov"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.95,

    },

    {

      url: sitemapUrl("/marketing-spetstehnika"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.95,

    },

    {

      url: sitemapUrl("/services"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.8,

    },

    {

      url: sitemapUrl("/optimizaciya-biznes-processov"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.9,

    },

    {

      url: sitemapUrl("/ai-avtomatizaciya-marketinga"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.9,

    },

    {

      url: sitemapUrl("/ai-dlya-prodazh"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.9,

    },

    {

      url: sitemapUrl("/about"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.8,

    },

    {

      url: sitemapUrl("/contact"),

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.8,

    },

    {

      url: sitemapUrl("/portfolio"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: sitemapUrl("/blog"),

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.85,

    },

  ];



  const casePages = getAllCaseStudies().map((item) => ({

    url: sitemapUrl(`/portfolio/${item.slug}`),

    lastModified: new Date(item.publishedAt),

    changeFrequency: "monthly" as const,

    priority: 0.6,

  }));



  const blogPages = getIndexedBlogPosts().map((item) => ({

    url: sitemapUrl(`/blog/${item.slug}`),

    lastModified: new Date(item.publishedAt),

    changeFrequency: "monthly" as const,

    priority: 0.65,

  }));



  return [...staticPages, ...casePages, ...blogPages];

}

