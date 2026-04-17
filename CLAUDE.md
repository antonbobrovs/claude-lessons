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
- При старте контейнера автоматически: migrate → seed → seed_content → seed_assignments → server

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

### Фаза 2 — выполнена (2026-04-17)
- Все роуты и страницы используют типы из `types/index.ts` (дублирование убрано)
- `GET /api/chapters/[chapterSlug]/lessons/[lessonSlug]` возвращает `LessonWithNav` с prev/next
- Навигация prev/next реализована через SQL `LAG`/`LEAD` (один запрос)
- Страница урока показывает кнопки «← Назад» / «Вперёд →» с названиями соседних уроков
- `/lessons` использует компонент `ChapterList`

### Фаза 3 — выполнена (2026-04-17)
- Установлены: `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js`, `@tailwindcss/typography`
- `components/MarkdownContent.tsx` — рендер Markdown с подсветкой кода (client component)
- `hooks/useProgress.ts` — SSR-safe localStorage хук (читает в useEffect)
- `components/CompleteButton.tsx` — кнопка «Завершить урок»
- `components/ProgressBar.tsx` — прогресс-бар (X из N уроков)
- `components/Sidebar.tsx` — боковая навигация с индикаторами прогресса (desktop only)
- `app/lessons/layout.tsx` — layout с сайдбаром для всех /lessons маршрутов
- `ChapterList.tsx` обновлён: индикаторы завершённых уроков

### Фаза 4 — выполнена (2026-04-17)
- `.dockerignore` создан: исключены `node_modules`, `.next`, `.env*`, `.git`
- CI/CD: автодеплой настраивается через Dokploy Settings → Auto Deploy (webhook)

### Фаза 5 — выполнена (2026-04-17)
- SEO: `app/layout.tsx` — title template, description, og-метаданные
- SEO: динамические метаданные на странице урока (`generateMetadata`)
- Мобильная вёрстка: `LessonsShell.tsx` управляет состоянием мобильного меню
- Сайдбар: мобильный drawer с backdrop, кнопка закрытия, закрывается при переходе
- `app/lessons/loading.tsx` и `[lessonSlug]/loading.tsx` — skeleton-состояния
- `app/lessons/error.tsx` — обработка ошибок с кнопкой «Попробовать снова»
- Главы с одним уроком: показываются как прямая ссылка (без вложенного sub-item)

### Фаза 6 — выполнена (2026-04-17)
- `scripts/seed_content.js` — Markdown-контент для всех 32 уроков (idempotent UPDATE)
- Контент структурирован: введение → теория → примеры → итог
- Источник: официальная документация code.claude.com/docs/ru/
- Dockerfile обновлён: `migrate → seed → seed_content → server`

### Фаза 7 — выполнена (2026-04-17)
- `migrations/002_assignments.sql` — таблица assignments с `UNIQUE(lesson_id, order)`
- `scripts/seed_assignments.js` — 1–2 задания на каждый из 32 уроков (idempotent upsert)
- `hooks/useAssignmentProgress.ts` — localStorage прогресс с методом `toggle` (двусторонний)
- `components/AssignmentBlock.tsx` — карточка задания: Markdown-описание + accordion подсказки
- `components/AssignmentList.tsx` — обёртка секции, скрывается если заданий нет
- `types/index.ts` обновлён: добавлен тип `Assignment`
- Страница урока: `getAssignments(lessonId)` + `<AssignmentList>` между контентом и кнопкой завершения
- Dockerfile обновлён: `migrate → seed → seed_content → seed_assignments → server`

## Конвенции
- Seed-скрипты пишутся как `.js` (не `.ts`) для запуска через `node` без доп. зависимостей
- Миграции — нумерованные SQL-файлы в `migrations/` (`001_init.sql`, `002_...sql`)
- Seed idempotent: `ON CONFLICT (slug) DO UPDATE` — безопасно запускать повторно
- Общие типы — только в `types/index.ts`, не дублировать в страницах и роутах
- `DATABASE_URL` доступен только внутри Docker-сети Dokploy, локальная разработка требует отдельной БД
