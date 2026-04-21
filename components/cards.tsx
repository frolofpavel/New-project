import Link from "next/link";

import { formatDate } from "@/lib/content";
import { BlogPost, CaseStudy, Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <p className="service-card__timeline">{service.timeline}</p>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <ul className="chip-list">
        {service.deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article className="case-card">
      <p className="case-card__meta">
        {item.client} · {formatDate(item.publishedAt)}
      </p>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      {item.result ? (
        <div className="case-card__result">
          {item.result}
        </div>
      ) : null}
      <Link href={`/portfolio/${item.slug}`} className="case-card__link">
        → открыть кейс
      </Link>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPost }) {
  return (
    <article className="blog-card">
      <p className="case-card__meta">
        {formatDate(item.publishedAt)} · {item.readingTime}
      </p>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      {item.tags.length > 0 ? (
        <ul className="chip-list">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <Link href={`/blog/${item.slug}`} className="case-card__link">
        → читать статью
      </Link>
    </article>
  );
}
