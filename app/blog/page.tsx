import type { Metadata } from "next";

import { BlogCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicHub } from "@/components/seo-topic-hub";
import { getIndexedBlogPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Блог",
  description:
    "Заметки о маркетинге как системе: AI-автоматизация, лидогенерация, архитектура роста. Блог Павла Фролова.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getIndexedBlogPosts();

  return (
    <>
      <section className="page-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="Блог"
          title="Заметки о маркетинге как системе и AI-операциях"
          description="Пишу о том, как собирать маркетинг не кусками, а как систему: архитектура, AI-агенты, процессы, реальные кейсы."
        />
      </section>

      <section className="section">
        {posts.length > 0 ? (
          <div className="cards-grid-3">
            {posts.map((item) => (
              <BlogCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="section-heading__eyebrow">Скоро</p>
            <h2>Первые статьи на подходе</h2>
            <p>Темы на очереди: архитектура маркетинговой системы, AI-агенты в рутине, операционные циклы и реальные числа.</p>
          </div>
        )}
      </section>

      <SeoTopicHub title="Материалы по AI-агентам" description="Посадочные страницы и статьи кластера внедрения." />

      <LeadStrip />
    </>
  );
}
