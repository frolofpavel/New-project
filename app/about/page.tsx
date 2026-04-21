import type { Metadata } from "next";

import { LeadStrip } from "@/components/lead-strip";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Павел Фролов — 19 лет в маркетинге, CMO с опытом бюджетов до 50M ₽/мес, последние 3 года — разработка AI-систем (AIOS, AI-BOS).",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <SectionHeading
          as="h1"
          eyebrow="Обо мне"
          title="CMO, который умеет в код: 19 лет маркетинга + 3 года AI-систем"
          description={`${siteConfig.role}. Работаю удалённо, с собственной командой подрядчиков. ${siteConfig.location}.`}
        />
      </section>

      <section className="section">
        <div className="article-layout">
          <div className="prose">
            <p>
              Занимаюсь маркетингом <strong>19 лет</strong>. Прошёл путь от
              специалиста до CMO. Управлял рекламными бюджетами{" "}
              <strong>до 50 млн ₽/мес</strong>, строил команды до 12 человек,
              выводил на рынок продукты с нуля и делал перезапуски работающего
              бизнеса.
            </p>

            <h2>Последние 3 года — AI-системы</h2>
            <p>
              Параллельно с маркетингом разрабатываю собственные AI-продукты.
              Сначала для себя (<strong>AIOS — AI Operating System</strong>,
              личная операционная система на Claude + Google Sheets + Telegram),
              потом для агентства (<strong>AI-BOS — Business OS</strong>,
              операционка агентства c 29 клиентскими агентами и 4
              автоматическими циклами).
            </p>
            <p>
              Сейчас это основная точка роста: могу не только придумать
              стратегию, но и сразу зашить автоматизации под неё — чтобы
              система работала без моего ежедневного участия.
            </p>

            <h2>Формат работы</h2>
            <ul>
              <li>
                проектирую архитектуру маркетинговой системы: ЦА, продукт,
                воронка, каналы;
              </li>
              <li>
                запускаю и веду каналы: Яндекс.Директ, SEO, B2B-аутрич,
                ретаргетинг;
              </li>
              <li>
                внедряю AI-агентов в рутину: квалификация лидов, первичный
                контакт, отчётность;
              </li>
              <li>
                настраиваю аналитику и дашборды, чтобы каждое решение было на
                цифрах, а не на интуиции.
              </li>
            </ul>

            <h2>Подход</h2>
            <p>
              Не «делаю рекламу» — строю машины, которые работают без меня. Не
              гонюсь за совершенством — запускаю за 2 недели и улучшаю
              итерациями. Каждое действие связываю с деньгами на выходе:
              выручкой, лидами, сделками.
            </p>
          </div>

          <aside className="aside-card">
            <p className="aside-card__eyebrow">Быстрые факты</p>
            <ul>
              {siteConfig.statRows.map((row) => (
                <li key={row.title}>
                  <strong>{row.value}</strong> — {row.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <LeadStrip />
    </>
  );
}
