import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться с Павлом Фроловым: обсудить сайт, упаковку экспертизы, блог или цифровой продукт.",
};

export default function ContactPage() {
  return (
    <section className="section section--contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="Контакты"
            title="Если у вас есть задача на сайт, digital-поддержку или упаковку экспертизы, давайте обсудим."
            description="Можно оставить заявку через форму или сразу написать в удобный канал. Если каналы доставки настроены, форма придет напрямую в Telegram и email."
          />

          <div className="contact-points">
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

        <ContactForm />
      </div>
    </section>
  );
}
