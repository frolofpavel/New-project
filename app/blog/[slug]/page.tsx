import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadStrip } from "@/components/lead-strip";
import { Markdown } from "@/components/markdown";
import { formatDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlogPostBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: {
      canonical: `/blog/${item.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const item = getBlogPostBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container article-layout">
          <div>
            <p className="hero__eyebrow">
              {formatDate(item.publishedAt)} • {item.readingTime}
            </p>
            <h1 className="article-title">{item.title}</h1>
            <p className="hero__description">{item.excerpt}</p>
            <ul className="chip-list">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <Markdown content={item.content} />
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
