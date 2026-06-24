"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/ai-agenty", label: "AI-агенты" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Кейсы" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакт" },
];

function useNovosibirskTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const nsk = new Date(utc + 7 * 60 * 60000);
      const h = String(nsk.getHours()).padStart(2, "0");
      const m = String(nsk.getMinutes()).padStart(2, "0");
      setTime(`Нск ${h}:${m}`);
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function SiteHeader() {
  const pathname = usePathname();
  const time = useNovosibirskTime();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = navigation.map((item) => {
    const isActive =
      item.href === "/"
        ? pathname === "/"
        : pathname?.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        data-active={isActive ? "true" : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  });

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Павел Фролов — главная">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            Frolov<span>.PF</span>
          </span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Основная навигация">
          {navLinks}
        </nav>

        <div className="site-header__right">
          <div className="live-status" aria-hidden="true">
            <span className="status-dot" />
            <span>{time || "Нск"}</span>
            <span className="live-status__text">· ответ в рабочий день</span>
          </div>
          <Link href="/ai-agenty" className="button button--primary button--sm site-header__cta">
            AI-агенты ↗
          </Link>
          <button
            type="button"
            className="site-nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`site-nav-backdrop${menuOpen ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <nav
        id="mobile-nav"
        className={`site-nav site-nav--mobile${menuOpen ? " is-open" : ""}`}
        aria-label="Мобильная навигация"
        aria-hidden={!menuOpen}
      >
        {navLinks}
        <Link
          href="/contact"
          className="button button--primary site-nav__mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Бесплатный аудит ↗
        </Link>
      </nav>
    </header>
  );
}
