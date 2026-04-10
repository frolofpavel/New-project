import type { Metadata } from "next";

import { BlogCard } from "@/components/cards";
import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи Павла Фролова о личных сайтах, контенте, кейсах и цифровой упаковке экспертизы.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Блог"
            title="Пишу о том, как строить личные сайты, контентные системы и понятную цифровую подачу."
            description="Здесь мысли, подходы и практические заметки, которые помогают связать экспертность, структуру и лидогенерацию."
          />
        </div>
      </section>

      <section className="section">
        <div className="container card-grid">
          {posts.map((item) => (
            <BlogCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
