import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-kicker">Персональный сайт</p>
          <h2>{siteConfig.name}</h2>
          <p className="footer-copy">
            {siteConfig.role}. Сайт как платформа для экспертизы, кейсов, контента и новых проектов.
          </p>
        </div>

        <div>
          <p className="footer-title">Навигация</p>
          <div className="footer-links">
            <Link href="/about">Обо мне</Link>
            <Link href="/services">Услуги</Link>
            <Link href="/portfolio">Кейсы</Link>
            <Link href="/blog">Блог</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Связь</p>
          <div className="footer-links">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>{siteConfig.phone}</a>
            <a href={siteConfig.vk} target="_blank" rel="noreferrer">
              VK
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{siteConfig.location}</p>
        <p>© 2026 {siteConfig.name}</p>
      </div>
    </footer>
  );
}
