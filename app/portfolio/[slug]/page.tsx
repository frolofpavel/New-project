import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { LeadStrip } from "@/components/lead-strip";
import { Markdown } from "@/components/markdown";
import { formatDate, getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { buildCaseStudySchema, buildPageMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    ...buildPageMetadata({
      title: item.seo.title,
      description: item.seo.description,
      path: `/portfolio/${item.slug}`,
      socialTitle: item.seo.title,
    }),
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const item = getCaseStudyBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Script
        id={`case-schema-${item.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(buildCaseStudySchema(item))}
      </Script>
      <section className="page-hero">
        <div className="article-layout">
          <div>
            <p className="section-heading__eyebrow">
              {item.client} · {formatDate(item.publishedAt)}
            </p>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                margin: "16px 0 20px",
              }}
            >
              {item.title}
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "var(--muted-2)",
                lineHeight: 1.6,
                maxWidth: "640px",
              }}
            >
              {item.excerpt}
            </p>
            {item.services.length > 0 ? (
              <ul className="chip-list" style={{ marginTop: "24px", borderTop: "none", paddingTop: 0 }}>
                {item.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="aside-card">
            <p className="aside-card__eyebrow">Кратко по проекту</p>
            <ul>
              {item.problem ? (
                <li>
                  <strong style={{ color: "var(--text)" }}>Проблема:</strong> {item.problem}
                </li>
              ) : null}
              {item.solution ? (
                <li>
                  <strong style={{ color: "var(--text)" }}>Решение:</strong> {item.solution}
                </li>
              ) : null}
              {item.result ? (
                <li>
                  <strong style={{ color: "var(--accent)" }}>Результат:</strong> {item.result}
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
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
