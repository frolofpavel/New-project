import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <p className="section-heading__eyebrow">404</p>
        <h1>Эта страница не найдена</h1>
        <p>Возможно, материал был перемещен или ссылка устарела.</p>
        <Link href="/" className="button button--primary">
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}
