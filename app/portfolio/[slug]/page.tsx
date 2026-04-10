import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadStrip } from "@/components/lead-strip";
import { Markdown } from "@/components/markdown";
import { formatDate, getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";

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
    title: item.seo.title,
    description: item.seo.description,
    alternates: {
      canonical: `/portfolio/${item.slug}`,
    },
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
      <section className="page-hero">
        <div className="container article-layout">
          <div>
            <p className="hero__eyebrow">
              {item.client} • {formatDate(item.publishedAt)}
            </p>
            <h1 className="article-title">{item.title}</h1>
            <p className="hero__description">{item.excerpt}</p>
            <ul className="chip-list">
              {item.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <aside className="aside-card">
            <p className="aside-card__eyebrow">Кратко по проекту</p>
            <p>
              <strong>Проблема:</strong> {item.problem}
            </p>
            <p>
              <strong>Решение:</strong> {item.solution}
            </p>
            <p>
              <strong>Результат:</strong> {item.result}
            </p>
          </aside>
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
