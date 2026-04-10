import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const navigation = [
  { href: "/about", label: "Обо мне" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакты" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="Павел Фролов — главная">
          <span className="brand__eyebrow">pavelfrolof.ru</span>
          <span className="brand__name">{siteConfig.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="button button--primary">
          Написать
        </Link>
      </div>
    </header>
  );
}
