import Link from "next/link";

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
      </div>
    </section>
  );
}
