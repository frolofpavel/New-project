/**
 * Портфолио клиентов и суммарные показатели — общие для всех нишевых
 * посадочных. Логотипы взяты с официальных сайтов компаний и приводятся
 * к монохрому на странице.
 *
 * Группы упорядочены: нишевая посадочная показывает свою группу первой
 * (см. `primaryGroup` в конфиге ниши).
 */

export type ClientItem = {
  name: string;
  file?: string;
  width?: number;
  height?: number;
};

export type ClientGroup = {
  /** Ключ для выбора приоритетной группы на нишевой посадочной. */
  key: string;
  title: string;
  items: ClientItem[];
};

export const clientGroups: ClientGroup[] = [
  {
    key: "development",
    title: "Застройщики",
    items: [
      { name: "Брусника", file: "/images/clients/brusnika.svg", width: 103, height: 13 },
      { name: "Расцветай", file: "/images/clients/rascvetay.svg", width: 236, height: 43 },
      { name: "КПД-Газстрой", file: "/images/clients/kpd-gazstroy.svg", width: 148, height: 64 },
      { name: "ГК Остов", file: "/images/clients/ostov.svg", width: 95, height: 40 },
      { name: "СЗ Эволюция", file: "/images/clients/evolyuciya.svg", width: 185, height: 31 },
      { name: "ЧерриДом", file: "/images/clients/cherrydom.svg", width: 688, height: 462 },
      { name: "Альфа Девелопмент", file: "/images/clients/alfa-development.png", width: 269, height: 96 },
      { name: "Чистая слобода" },
      { name: "Первый строительный фонд" },
      { name: "Кварталы Немировича" },
      { name: "Ясный берег" },
      { name: "Аквамарин / МЕТР" },
    ],
  },
  {
    key: "federal",
    title: "Федеральные бренды",
    items: [
      { name: "Мария", file: "/images/clients/marya.svg", width: 283, height: 55 },
      { name: "Marquiz", file: "/images/clients/marquiz.svg", width: 120, height: 21 },
      { name: "КСК ГРУПП", file: "/images/clients/ksk.svg", width: 99, height: 67 },
      { name: "Додо Пицца" },
      { name: "Кари" },
      { name: "Алгоритмика" },
    ],
  },
  {
    key: "b2b",
    title: "B2B, производство, логистика",
    items: [
      { name: "Насклад Групп", file: "/images/clients/nasklad.svg", width: 598, height: 104 },
      { name: "АТА Транспортная", file: "/images/clients/ata.svg", width: 361, height: 132 },
      { name: "БАУМЕХ", file: "/images/clients/baumeh.png", width: 631, height: 96 },
      { name: "ЕВРОМЕТ", file: "/images/clients/evromet.svg", width: 206, height: 36 },
      { name: "СБМ Аренда" },
      { name: "Тимбермаш Байкал" },
      { name: "Tisel" },
      { name: "Royal Forklift" },
      { name: "ЦТО" },
      { name: "Астрейд" },
      { name: "Пласт-Тара" },
      { name: "Мобиус Логистика" },
    ],
  },
  {
    key: "retail",
    title: "Медицина, услуги, ритейл",
    items: [
      { name: "Авиценна" },
      { name: "Претор" },
      { name: "Содействие Финанс Групп" },
      { name: "Гамма Групп" },
      { name: "Высокий градус" },
      { name: "Онгласс" },
      { name: "Спарта" },
      { name: "OpticPlace" },
      { name: "KVALITELLI" },
      { name: "Стимбаланс" },
      { name: "Alkor Tactical" },
      { name: "СИБУПК" },
    ],
  },
];

/**
 * Возвращает группы клиентов, поставив нишевую первой. Если ключ не задан
 * или не найден — порядок остаётся исходным.
 */
export function orderedClientGroups(primaryKey?: string): ClientGroup[] {
  if (!primaryKey) return clientGroups;
  const primary = clientGroups.find((g) => g.key === primaryKey);
  if (!primary) return clientGroups;
  return [primary, ...clientGroups.filter((g) => g.key !== primaryKey)];
}

export type ScaleItem = { value: string; label: string };

/** Масштаб за месяц по всему портфелю клиентов. */
export const monthlyScale: ScaleItem[] = [
  { value: "35 000 м²", label: "продано жилья, первичный рынок" },
  { value: "5 000 м²", label: "продано жилья, ИЖС" },
  { value: "7 млн", label: "кликов" },
  { value: "50 млн ₽", label: "рекламного бюджета" },
  { value: "17 000", label: "заявок" },
];
