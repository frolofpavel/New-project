import type { Metadata } from "next";

import { BlogCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Заметки о маркетинге как системе, AI-агентах, операционной архитектуре и реальной практике работы с проектами.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <section className="page-hero">
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

      <LeadStrip />
    </>
  );
}
