import type { Metadata } from "next";
import Script from "next/script";

import { ContactForm } from "@/components/contact-form";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicHub } from "@/components/seo-topic-hub";
import { siteConfig } from "@/lib/site-config";
import { buildContactPageSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакт",
  description:
    "Обсудить внедрение AI-агентов под ключ с Павлом Фроловым. Заявка, Telegram, email — ответ в рабочий день.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Script id="contact-page-schema" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(buildContactPageSchema())}
      </Script>
      <section className="page-hero">
        <PageBreadcrumbs
          items={[
            { name: "Главная", path: "/" },
            { name: "Контакт", path: "/contact" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="Контакт"
          title="Обсудим вашу архитектуру?"
          description="Расскажите задачу — разберём, как её решить системно, с AI и без лишних слов. Удобно в Telegram, по email или через форму ниже."
        />
      </section>

      <section className="section">
        <div className="contact-layout">
          <div>
            <h3 style={{ fontSize: "15px", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
              Прямые каналы
            </h3>
            <div className="contact-points">
              <a href={siteConfig.telegram} target="_blank" rel="noreferrer">
                <span aria-hidden="true">💬</span>
                <span>Telegram — {siteConfig.telegramHandle}</span>
              </a>
              <a href={siteConfig.telegramAlt} target="_blank" rel="noreferrer">
                <span aria-hidden="true">💬</span>
                <span>Telegram — {siteConfig.telegramAltHandle}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`}>
                <span aria-hidden="true">✉️</span>
                <span>{siteConfig.email}</span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
                <span aria-hidden="true">📞</span>
                <span>{siteConfig.phone}</span>
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                <span aria-hidden="true">📱</span>
                <span>WhatsApp</span>
              </a>
              <a href={siteConfig.vk} target="_blank" rel="noreferrer">
                <span aria-hidden="true">🔗</span>
                <span>VK — @frolofpavel</span>
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
                <span aria-hidden="true">📸</span>
                <span>Instagram — @frolofpavel</span>
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <SeoTopicHub title="Полезные материалы" description="Перед созвоном — посадочные и статья про пошаговое внедрение." />
    </>
  );
}
