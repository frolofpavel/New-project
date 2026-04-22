import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { LeadStrip } from "@/components/lead-strip";
import { Markdown } from "@/components/markdown";
import { formatDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { buildBlogPostSchema, buildPageMetadata } from "@/lib/seo";

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
    ...buildPageMetadata({
      title: item.seo.title,
      description: item.seo.description,
      path: `/blog/${item.slug}`,
      socialTitle: item.seo.title,
    }),
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
      <Script
        id={`blog-schema-${item.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(buildBlogPostSchema(item))}
      </Script>
      <section className="page-hero">
        <p className="section-heading__eyebrow">
          {formatDate(item.publishedAt)} · {item.readingTime}
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: "16px 0 20px",
            maxWidth: "880px",
          }}
        >
          {item.title}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "var(--muted-2)",
            lineHeight: 1.6,
            maxWidth: "720px",
          }}
        >
          {item.excerpt}
        </p>
        {item.tags.length > 0 ? (
          <ul className="chip-list" style={{ marginTop: "28px", borderTop: "none", paddingTop: 0 }}>
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="section">
        <div className="prose">
          <Markdown content={item.content} />
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
