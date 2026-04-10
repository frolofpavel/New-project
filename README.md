# frolofpavel.ru

Персональный сайт Павла Фролова на `Next.js` с блогом, кейсами, страницами услуг и контактной формой.

## Запуск

```bash
npm install
npm run dev
```

Если порт `3000` занят:

```bash
npm run dev -- --port 3001
```

Продакшн-сборка:

```bash
npm run build
npm run start
```

## Где менять контент

- Основные данные сайта и контакты: `lib/site-config.ts`
- Кейсы: `content/portfolio/*.md`
- Статьи блога: `content/blog/*.md`
- Настройка доставки заявок: `.env.local`

## Что уже есть

- Главная страница
- Обо мне
- Услуги
- Портфолио и страницы кейсов
- Блог и страницы статей
- Контакты и форма заявки
- `robots.txt`, `sitemap.xml`, favicon, metadata

## Настройка формы заявок

Форма на `/contact` отправляет данные в `app/api/contact/route.ts`.

Поддерживаются два канала доставки:

- Telegram Bot API
- Resend email API

Можно включить любой один канал или оба сразу.

### `.env.local`

Скопируйте `.env.example` в `.env.local` и заполните нужные значения.

Пример:

```bash
cp .env.example .env.local
```

Для Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

### Telegram

Нужны переменные:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Email через Resend

Нужны переменные:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

### Поведение без настроенных каналов

- в `development` заявка сохраняется в серверный лог;
- в `production` форма вернет ошибку настройки, если ни один канал не подключен.
