import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Обсудим архитектуру маркетинга, AI-агентов или операционное ведение. Telegram, email, телефон — или форма на странице.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
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
                <span>Telegram — @pavelfrolof</span>
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
    </>
  );
}
