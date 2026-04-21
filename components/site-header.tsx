"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Главная" },
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

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Павел Фролов — главная">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            Frolov<span>.PF</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Основная навигация">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__right">
          <div className="live-status" aria-hidden="true">
            <span className="status-dot" />
            <span>{time || "Нск"}</span>
            <span className="live-status__text">· открыт к обсуждениям</span>
          </div>
          <Link href="/contact" className="button button--primary button--sm">
            → обсудить
          </Link>
        </div>
      </div>
    </header>
  );
}
