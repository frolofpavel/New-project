import Link from "next/link";
import Script from "next/script";

import { buildBreadcrumbJsonLd } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  const slug = items.map((item) => item.path.replace(/\//g, "-")).join("");

  return (
    <>
      <Script
        id={`breadcrumb-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(buildBreadcrumbJsonLd(items))}
      </Script>
      <nav className="page-breadcrumbs" aria-label="Хлебные крошки">
        <ol className="page-breadcrumbs__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="page-breadcrumbs__item">
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
