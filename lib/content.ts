import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { BlogPost, CaseStudy, SeoFields } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content");

type ContentFrontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  cover: string;
  seo: SeoFields;
  client?: string;
  problem?: string;
  solution?: string;
  result?: string;
  services?: string[];
  tags?: string[];
  readingTime?: string;
};

function readMarkdownFiles(folder: "blog" | "portfolio") {
  const folderPath = path.join(contentDirectory, folder);

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(folderPath, fileName), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        content,
        data: data as ContentFrontmatter,
      };
    });
}

export function getAllCaseStudies(): CaseStudy[] {
  return readMarkdownFiles("portfolio")
    .map(({ slug, content, data }) => ({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      cover: data.cover,
      seo: data.seo,
      client: data.client ?? "Конфиденциальный клиент",
      problem: data.problem ?? "",
      solution: data.solution ?? "",
      result: data.result ?? "",
      services: data.services ?? [],
      content,
    }))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getCaseStudyBySlug(slug: string) {
  return getAllCaseStudies().find((item) => item.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return readMarkdownFiles("blog")
    .map(({ slug, content, data }) => ({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      cover: data.cover,
      seo: data.seo,
      tags: data.tags ?? [],
      readingTime: data.readingTime ?? "5 минут",
      content,
    }))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  return getAllBlogPosts().find((item) => item.slug === slug);
}

export function formatDate(input: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(input));
}
