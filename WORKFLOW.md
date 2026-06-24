# pavelfrolof.ru — рабочий процесс

**URL:** https://pavelfrolof.ru  
**Репо:** https://github.com/frolofpavel/New-project  
**Локально:** `C:\Users\Pavel\Progetc\Работа\pavelfrolof.ru`  
**Прод:** Timeweb `5.23.50.191`, SSH `frolof@novoe.online`, путь `~/pavelfrolof.ru/public_html/`

## Стек

- Next.js 15 (App Router), static export → папка `out/`
- Форма заявок: `public/contact.php` → на проде читает `../contact_config.php`
- КП: `public/proposals/*.html` — попадают в `out/proposals/` при сборке

## Команды

```powershell
cd "C:\Users\Pavel\Progetc\Работа\pavelfrolof.ru"

# dev-сервер (локально)
npm run dev

# сборка static export
npm run build

# деплой на Timeweb (build + scp)
npm run deploy

# только заливка (если build уже был)
npm run deploy:only
```

## Где править контент

| Что | Файл |
|-----|------|
| Hero, услуги, SEO, контакты | `lib/site-config.ts` |
| Кейсы | `content/portfolio/*.md` |
| Блог | `content/blog/*.md` |
| Страница AI-агенты | `app/ai-agenty/page.tsx` |
| Компоненты | `components/` |

## Деплой

1. `npm run build` → `out/`
2. `scripts/deploy.ps1` → scp в `~/pavelfrolof.ru/public_html/`
3. Smoke: `https://pavelfrolof.ru` → 200, `/ai-agenty/` → 200

**Не затирается:** файлы на сервере вне `out/` (если scp только merge). Папка `proposals/` на сервере может содержать КП, которых нет в git — перед массовым деплоем сверить.

## Форма заявок

- Прод: POST на `/contact.php`
- Секреты: `~/pavelfrolof.ru/contact_config.php` (не в git)
- Telegram-токены — заполнить вручную на сервере при необходимости

## Связь с IRI CEO

- Стратегия, офферы, тексты → `/iri-ceo`
- Код и деплой → `/dev-hq` или эта папка
