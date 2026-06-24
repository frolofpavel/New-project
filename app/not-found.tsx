import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Главная" },
  { href: "/ai-agenty", label: "AI-агенты" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакт" },
];

export default function NotFound() {
  return (
    <section className="section">
      <div className="empty-state">
        <p className="section-heading__eyebrow">404</p>
        <h1>Страница не найдена</h1>
        <p>Возможно, материал был перемещён или ссылка устарела.</p>
        <Link href="/" className="button button--primary">
          На главную
        </Link>
        <nav className="not-found__links" aria-label="Быстрая навигация">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
