# PRD: Веб-платформа курса «Claude Code»

**Версия:** 1.1 · Апрель 2026  
**Продакшн:** claudelessons.insight-navigator.ru  
**Статус:** MVP готов (Фазы 1–7), в работе: Фаза 8

---

## Цель продукта

Образовательная веб-платформа для прохождения курса «Claude Code» — структурированный доступ к главам и урокам с отслеживанием прогресса пользователя. Без авторизации, без монетизации в первой версии.

---

## Технический стек

| Компонент | Решение |
|---|---|
| Фреймворк | Next.js 14 App Router |
| Язык | TypeScript (строгий, no-implicit-any) |
| Стили | Tailwind CSS (единственная система) |
| База данных | PostgreSQL через Dokploy на VPS |
| ORM | Нет (нативный pg Pool) |
| Markdown | react-markdown + remark-gfm |
| Подсветка кода | shiki или highlight.js |
| Прогресс | localStorage (без авторизации) |
| Деплой | Docker (standalone) → GitHub → Dokploy |

---

## Схема базы данных

### `chapters`
```sql
CREATE TABLE chapters (
  id     SERIAL PRIMARY KEY,
  title  TEXT NOT NULL,
  slug   TEXT NOT NULL UNIQUE,
  order  INTEGER NOT NULL
);
```

### `lessons`
```sql
CREATE TABLE lessons (
  id         SERIAL PRIMARY KEY,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id),
  title      TEXT NOT NULL,
  slug       TEXT NOT NULL,
  content    TEXT,          -- Markdown / MDX
  order      INTEGER NOT NULL,
  UNIQUE(chapter_id, slug)
);
```

---

## Маршруты

### Страницы
| Маршрут | Описание |
|---|---|
| `/lessons` | Список всех глав с уроками. Прогресс из localStorage. |
| `/lessons/[chapterSlug]/[lessonSlug]` | Страница урока: Markdown, навигация prev/next, кнопка «Завершить» |

### API Routes (`app/api/`)
| Метод + Маршрут | Описание |
|---|---|
| `GET /api/chapters` | Массив глав со вложенными уроками (id, title, slug, order) |
| `GET /api/chapters/[chapterSlug]/lessons/[lessonSlug]` | Один урок полностью + prev/next ссылки |

---

## Скоуп MVP

### В скоупе (v1)
- **P0:** Листинг глав и уроков
- **P0:** Страница урока с Markdown-рендером
- **P0:** Прогресс в localStorage (`{lessonSlug: true}`)
- **P0:** REST API (chapters + lessons)
- **P0:** Dockerfile + деплой через Dokploy
- **P1:** Навигация prev/next между уроками
- **P1:** Seed-данные — все 25 глав из программы курса
- **P1:** Прогресс-бар (X из N уроков завершено)

### В скоупе (v2 — в работе)
- **P1:** Markdown-контент для всех 32 уроков ✅ Фаза 6
- **P1:** Практические задания (1–2 на урок) ✅ Фаза 7
- **P1:** Проверочные тесты (урок + глава) — Фаза 8

### Вне скоупа (v3+)
- Авторизация и аккаунты
- Комментарии и обсуждения
- Видео-уроки
- Поиск по контенту
- Оплата / монетизация
- CMS / визуальный редактор

---

## Технические требования

1. **TypeScript везде** — строгая типизация, типы для БД-сущностей и API-ответов
2. **Только Tailwind CSS** — никаких CSS-модулей, styled-components или inline-стилей
3. **Структура:** API в `app/api/`, компоненты в `components/`, утилиты БД в `lib/`
4. **Dockerfile** — `output: 'standalone'`, multi-stage build, env var `DATABASE_URL`
5. **Прогресс SSR-safe** — читать localStorage только в `useEffect`, иначе hydration mismatch
6. **Slug-based URL** — никаких числовых ID в адресной строке

---

## Plan действий

### Фаза 1 — Инициализация (День 1)
- [ ] Создать Next.js 14 с TypeScript, App Router, Tailwind CSS
- [ ] Настроить структуру: `app/`, `components/`, `lib/db.ts`, `types/`
- [ ] Подключить PostgreSQL (pg или postgres.js), настроить `DATABASE_URL`
- [ ] Написать SQL-миграции: таблицы `chapters` и `lessons`
- [ ] Написать seed-скрипт с данными из программы курса (25 глав)

### Фаза 2 — API Routes (День 2)
- [ ] `GET /api/chapters` — все главы с уроками, отсортированные по `order`
- [ ] `GET /api/chapters/[chapterSlug]/lessons/[lessonSlug]` — один урок + prev/next
- [ ] Типизировать ответы: `Chapter`, `Lesson`, `LessonWithNav` интерфейсы
- [ ] Error handling: 404 для несуществующих slug-ов
- [ ] Протестировать все роуты через curl / REST-клиент

### Фаза 3 — Страницы и компоненты (Дни 3–5)
- [ ] Компонент `ChapterList` — аккордеон или плоский список
- [ ] Страница `/lessons` — серверная выборка, прогресс на клиенте
- [ ] Страница `/lessons/[chapterSlug]/[lessonSlug]` — рендер Markdown
- [ ] Навигация prev/next между уроками
- [ ] Хук `useProgress` — чтение/запись localStorage (SSR-safe через `useEffect`)
- [ ] Кнопка «Отметить урок выполненным», индикаторы на списке
- [ ] Layout-компонент с сайдбаром навигации

### Фаза 4 — Docker и деплой (День 6)
- [ ] Добавить `output: 'standalone'` в `next.config.ts`
- [ ] Написать multi-stage Dockerfile (builder → runner)
- [ ] Настроить `.dockerignore`
- [ ] Протестировать локально: `docker build && docker run`
- [ ] Настроить проект в Dokploy: GitHub repo, env vars, `DATABASE_URL`
- [ ] Первый деплой на `claudelessons.insight-navigator.ru`

### Фаза 5 — Контент и полировка ✅ выполнена (2026-04-17)
- [x] Настроить метаданные (title, description, og:image) для SEO
- [x] Адаптивная вёрстка (mobile + desktop), мобильный drawer
- [x] Прогресс-бар: X из N уроков завершено
- [x] Loading/skeleton состояния, обработка ошибок
- [x] Настройка CI/CD: автодеплой через Dokploy webhook
- [x] Главы с одним уроком: прямая ссылка без sub-item

### Фаза 6 — Контент уроков ✅ выполнена (2026-04-17)
- [x] `scripts/seed_content.js` — Markdown-контент для всех 32 уроков
- [x] Структура каждого урока: введение → теория → примеры → итог
- [x] Источник: официальная документация code.claude.com/docs/ru/
- [x] Dockerfile: `migrate → seed → seed_content → server`

### Фаза 7 — Практические задания ✅ выполнена (2026-04-17)
- [x] `migrations/002_assignments.sql` — таблица assignments с UNIQUE(lesson_id, order)
- [x] `scripts/seed_assignments.js` — 1–2 задания на каждый из 32 уроков
- [x] `components/AssignmentBlock.tsx` — карточка с Markdown-описанием и accordion подсказками
- [x] `hooks/useAssignmentProgress.ts` — localStorage прогресс с toggle
- [x] `types/index.ts` и страница урока обновлены

### Фаза 8 — Проверочные тесты (в плане)
- [ ] `migrations/003_quizzes.sql` — таблицы quizzes + quiz_questions
- [ ] `scripts/seed_quizzes.js` — 3–5 вопросов на урок, 5–7 на главу
- [ ] `components/QuizBlock.tsx` — вопросы A/B/C/D, объяснения, итог
- [ ] `hooks/useQuizProgress.ts` — localStorage результаты
- [ ] Тест главы: `/lessons/[chapterSlug]/test`

---

## Ключевые решения и риски

| Риск | Митигация |
|---|---|
| Холодный старт БД | Connection pooling — pgbouncer или встроенный в Dokploy |
| SSR + localStorage | Читать прогресс только в `useEffect`, использовать `useState` с `null` как начальным значением |
| Slug коллизии | `UNIQUE(chapter_id, slug)` в таблице `lessons` |
| Большой контент | Пагинация или ленивая загрузка уроков при масштабировании |

---

## Структура проекта (рекомендуемая)

```
/
├── app/
│   ├── api/
│   │   └── chapters/
│   │       ├── route.ts
│   │       └── [chapterSlug]/lessons/[lessonSlug]/
│   │           └── route.ts
│   ├── lessons/
│   │   ├── page.tsx
│   │   └── [chapterSlug]/[lessonSlug]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ChapterList.tsx
│   ├── LessonPage.tsx
│   ├── ProgressBar.tsx
│   └── Navigation.tsx
├── lib/
│   ├── db.ts
│   └── queries.ts
├── types/
│   └── index.ts
├── scripts/
│   └── seed.ts
├── Dockerfile
├── .dockerignore
└── next.config.ts
```

---

*Документ создан на основе программы курса «Курс по Claude Code: полное введение в разработку с нуля» и технических требований проекта.*
