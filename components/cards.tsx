import Link from "next/link";

import { formatDate } from "@/lib/content";
import { BlogPost, CaseStudy, Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card">
      <p className="card__meta">{service.timeline}</p>
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
    <article className="card card--feature">
      <p className="card__meta">
        {item.client} • {formatDate(item.publishedAt)}
      </p>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      <ul className="chip-list">
        {item.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <Link href={`/portfolio/${item.slug}`} className="text-link">
        Открыть кейс
      </Link>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPost }) {
  return (
    <article className="card">
      <p className="card__meta">
        {formatDate(item.publishedAt)} • {item.readingTime}
      </p>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      <ul className="chip-list">
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <Link href={`/blog/${item.slug}`} className="text-link">
        Читать статью
      </Link>
    </article>
  );
}
