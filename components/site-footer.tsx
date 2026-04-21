import Link from "next/link";

import { HugeMarquee } from "@/components/motion/huge-marquee";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__marquee" aria-hidden="true">
        <HugeMarquee
          items={["FROLOV.PF", "AI-АРХИТЕКТОР", "FROLOV.PF", "2026", "FROLOV.PF", "ARCHITECTURE"]}
          direction="left"
          duration={52}
          variant="outline"
        />
      </div>

      <div className="site-footer__grid">
        <div className="site-footer__col">
          <p className="site-footer__brand">
            Frolov<span>.PF</span>
          </p>
          <p className="site-footer__about">
            {siteConfig.role}. Проектирую системы, внедряю AI-агентов, веду
            маркетинговые операции под бизнес-результат.
          </p>
          <div className="site-footer__status">
            <span className="status-dot" aria-hidden="true" />
            <span>Свободен для новых проектов · Q2 2026</span>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Навигация</h4>
          <div className="site-footer__links">
            <Link href="/">Главная</Link>
            <Link href="/services">Услуги</Link>
            <Link href="/portfolio">Кейсы</Link>
            <Link href="/blog">Блог</Link>
            <Link href="/about">Обо мне</Link>
            <Link href="/contact">Контакт</Link>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Связь</h4>
          <div className="site-footer__links">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
              {siteConfig.phone}
            </a>
            <a href={siteConfig.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={siteConfig.vk} target="_blank" rel="noreferrer">
              VK
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copy">{siteConfig.location}</p>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} · {siteConfig.name} · Новосибирск
        </p>
      </div>
    </footer>
  );
}
