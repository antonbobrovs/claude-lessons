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
