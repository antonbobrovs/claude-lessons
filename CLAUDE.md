# Проект: Курс по Claude Code

## Стек
- Next.js 14 App Router
- PostgreSQL (через Dokploy на VPS)
- Деплой: GitHub → Dokploy → dokploy.insight-navigator.ru

## Структура БД
- chapters(id, title, slug, order)
- lessons(id, chapter_id, title, slug, content, order)

## Маршруты
- /lessons — список глав и уроков
- /lessons/[chapterSlug]/[lessonSlug] — страница урока
- GET /api/chapters — список глав с уроками
- GET /api/chapters/[chapterSlug]/lessons/[lessonSlug] — один урок

## Правила
- Всегда используй TypeScript
- Стили только через Tailwind CSS
- API Routes в app/api/
- Компоненты в components/
- Прогресс пользователя сейчас в localStorage (авторизации нет)

## Деплой
- Dockerfile нужен для standalone Next.js build
- Переменные окружения: DATABASE_URL
- Продакшн: https://claudelessons.insight-navigator.ru/
- При старте контейнера автоматически: migrate → seed → server

## Статус проекта

### Фаза 1 — выполнена (2026-04-17)
- Next.js 14 + TypeScript + Tailwind + PostgreSQL подключены и задеплоены
- Миграции: `migrations/001_init.sql` (таблицы chapters, lessons)
- Seed: `scripts/seed.js` — 25 глав, 32 урока (idempotent upsert)
- API Routes готовы: `/api/chapters`, `/api/chapters/[chapterSlug]/lessons/[lessonSlug]`
- Страницы готовы: `/lessons`, `/lessons/[chapterSlug]/[lessonSlug]`
- `types/index.ts` — общие типы Chapter, Lesson, LessonWithNav
- `components/ChapterList.tsx` — компонент списка глав
- Деплой на продакшн работает, все 25 глав отображаются

### Фаза 2 — следующая
- Проверить и расширить API (prev/next в уроке)
- Добавить react-markdown + remark-gfm
- useProgress хук, кнопка «Завершить урок», прогресс-бар

## Конвенции
- Seed-скрипты пишутся как `.js` (не `.ts`) для запуска через `node` без доп. зависимостей
- Миграции — нумерованные SQL-файлы в `migrations/` (`001_init.sql`, `002_...sql`)
- Seed idempotent: `ON CONFLICT (slug) DO UPDATE` — безопасно запускать повторно
- Общие типы — только в `types/index.ts`, не дублировать в страницах и роутах
- `DATABASE_URL` доступен только внутри Docker-сети Dokploy, локальная разработка требует отдельной БД
