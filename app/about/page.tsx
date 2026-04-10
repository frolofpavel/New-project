import type { Metadata } from "next";

import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "О Павле Фролове, подходе к работе и тому, как строятся сайты и цифровые продукты под личный бренд.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Обо мне"
            title="Работаю там, где встречаются стратегия, контент, продукт и уверенная цифровая подача."
            description={`${siteConfig.name} — ${siteConfig.role}. Помогаю экспертам, авторам и командам собирать понятные сайты и цифровые презентации, которые не стыдно показывать и легко использовать в продажах.`}
          />
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="prose">
            <p>
              Мне интересны проекты, где нужно не просто сделать красивый сайт, а вытащить из бизнеса или экспертизы
              ясную структуру: кто вы, зачем к вам идти, чем вы отличаетесь и как человек должен сделать следующий шаг.
            </p>
            <p>
              Обычно я подключаюсь в моменты, когда у проекта уже есть опыт, сильный продукт или качественная
              экспертиза, но нет цельной цифровой витрины. Тогда сайт становится сборочной точкой для смыслов, кейсов,
              контента и коммуникации.
            </p>
            <h2>Чем полезен</h2>
            <ul>
              <li>собираю позиционирование и оффер в понятную структуру;</li>
              <li>проектирую путь пользователя от интереса к контакту;</li>
              <li>помогаю перевести хаос материалов в рабочую контентную систему;</li>
              <li>довожу идею до реального запуска, а не только до концепта.</li>
            </ul>
          </div>

          <aside className="aside-card">
            <p className="aside-card__eyebrow">Формат работы</p>
            <ul>
              <li>стратегические сессии и упаковка позиции</li>
              <li>проектирование сайта и контентной карты</li>
              <li>полный запуск сайта под ключ</li>
              <li>редактура кейсов и блога</li>
            </ul>
          </aside>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
