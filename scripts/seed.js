// @ts-check
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

/** @type {{ title: string, slug: string, lessons: { title: string, slug: string }[] }[]} */
const chapters = [
  {
    title: 'Контекст, который сделал Claude Code необходимым',
    slug: 'context-claude-code-necessary',
    lessons: [
      { title: 'Контекст, который сделал Claude Code необходимым', slug: 'context-claude-code-necessary-intro' },
    ],
  },
  {
    title: 'Anthropic — бэкграунд и назначение',
    slug: 'anthropic-background',
    lessons: [
      { title: 'Anthropic — бэкграунд и назначение', slug: 'anthropic-background-intro' },
    ],
  },
  {
    title: 'Семейство моделей Claude',
    slug: 'claude-model-family',
    lessons: [
      { title: 'Семейство моделей Claude', slug: 'claude-model-family-intro' },
    ],
  },
  {
    title: 'Что такое Claude Code',
    slug: 'what-is-claude-code',
    lessons: [
      { title: 'Что такое Claude Code', slug: 'what-is-claude-code-intro' },
    ],
  },
  {
    title: 'Почему сообществу разработчиков это было необходимо',
    slug: 'why-developers-needed-it',
    lessons: [
      { title: 'Почему сообществу разработчиков это было необходимо', slug: 'why-developers-needed-it-intro' },
    ],
  },
  {
    title: 'Установка и первоначальная настройка / оплата подписки',
    slug: 'installation-setup',
    lessons: [
      { title: 'Установка и первоначальная настройка / оплата подписки', slug: 'installation-setup-intro' },
    ],
  },
  {
    title: 'VS Code и расширение Claude Code',
    slug: 'vscode-extension',
    lessons: [
      { title: 'VS Code и расширение Claude Code', slug: 'vscode-extension-intro' },
    ],
  },
  {
    title: 'Подписки, стоимость токенов и использование',
    slug: 'subscriptions-tokens-cost',
    lessons: [
      { title: 'Подписки, стоимость токенов и использование', slug: 'subscriptions-tokens-cost-intro' },
    ],
  },
  {
    title: 'Работа в первой сессии',
    slug: 'first-session',
    lessons: [
      { title: 'Работа в первой сессии', slug: 'first-session-intro' },
    ],
  },
  {
    title: 'Дисциплина промптов — inputs данные определяют outputs',
    slug: 'prompt-discipline',
    lessons: [
      { title: 'Дисциплина промптов — inputs данные определяют outputs', slug: 'prompt-discipline-intro' },
    ],
  },
  {
    title: 'Планирование как ключевая практика',
    slug: 'planning-practice',
    lessons: [
      { title: 'Планирование как ключевая практика', slug: 'planning-practice-intro' },
    ],
  },
  {
    title: 'Построение по фичам',
    slug: 'building-by-features',
    lessons: [
      { title: 'Построение по фичам', slug: 'building-by-features-intro' },
    ],
  },
  {
    title: 'Как на самом деле работает Claude Code',
    slug: 'how-claude-code-works',
    lessons: [
      { title: 'Как на самом деле работает Claude Code', slug: 'how-claude-code-works-intro' },
    ],
  },
  {
    title: 'Архитектура приложений с Claude Code',
    slug: 'app-architecture',
    lessons: [
      { title: 'Архитектура приложений с Claude Code', slug: 'app-architecture-intro' },
    ],
  },
  {
    title: 'Plan Mode, Edit Mode, и операционные режимы',
    slug: 'plan-edit-modes',
    lessons: [
      { title: 'Plan Mode, Edit Mode, и операционные режимы', slug: 'plan-edit-modes-intro' },
    ],
  },
  {
    title: 'Контекстные окна и управление сессиями',
    slug: 'context-windows-sessions',
    lessons: [
      { title: 'Контекстные окна и управление сессиями', slug: 'context-windows-sessions-intro' },
    ],
  },
  {
    title: 'MCP-серверы и внешние интеграции',
    slug: 'mcp-servers-integrations',
    lessons: [
      { title: 'MCP-серверы и внешние интеграции', slug: 'mcp-servers-integrations-intro' },
      { title: 'Как создать сервер MCP с помощью Python, Docker и Claude Code', slug: 'mcp-server-python-docker' },
      { title: 'Топ MCP-серверов, которые превращают Claude в машину', slug: 'mcp-top-servers' },
    ],
  },
  {
    title: 'Агенты, саб-агенты и параллельные воркфлоу',
    slug: 'agents-subagents-parallel',
    lessons: [
      { title: 'Агенты, саб-агенты и параллельные воркфлоу', slug: 'agents-subagents-parallel-intro' },
    ],
  },
  {
    title: 'Skills, правила и персистентные инструкции',
    slug: 'skills-rules-persistent',
    lessons: [
      { title: 'Skills, правила и персистентные инструкции', slug: 'skills-rules-persistent-intro' },
      { title: 'Как создать свой собственный Claude Code Skill', slug: 'skills-create-custom' },
      { title: 'Анатомия папки .claude/', slug: 'skills-claude-folder-anatomy' },
    ],
  },
  {
    title: 'Автономные циклы — условия применения',
    slug: 'autonomous-loops',
    lessons: [
      { title: 'Автономные циклы — условия применения', slug: 'autonomous-loops-intro' },
    ],
  },
  {
    title: 'Code Review, безопасность и верификация',
    slug: 'code-review-security',
    lessons: [
      { title: 'Code Review, безопасность и верификация', slug: 'code-review-security-intro' },
    ],
  },
  {
    title: 'Шаблоны стартовых проектов',
    slug: 'starter-project-templates',
    lessons: [
      { title: 'Шаблоны стартовых проектов', slug: 'starter-project-templates-intro' },
      { title: '8 хуков Claude Code, которые автоматизируют всю твою рутину', slug: 'starter-hooks-automation' },
      { title: '10 slash-команд, чтобы использовать Claude Code как Boris Cherny', slug: 'starter-slash-commands' },
      { title: 'Как настроить Claude Cowork', slug: 'starter-cowork-setup' },
    ],
  },
  {
    title: 'Текущая граница возможностей Claude Code',
    slug: 'current-limits',
    lessons: [
      { title: 'Текущая граница возможностей Claude Code', slug: 'current-limits-intro' },
    ],
  },
  {
    title: 'Инженерия ПО как дисциплина',
    slug: 'software-engineering-discipline',
    lessons: [
      { title: 'Инженерия ПО как дисциплина', slug: 'software-engineering-discipline-intro' },
    ],
  },
  {
    title: 'Структурированная дорожная карта',
    slug: 'structured-roadmap',
    lessons: [
      { title: 'Структурированная дорожная карта', slug: 'structured-roadmap-intro' },
    ],
  },
]

async function seed() {
  console.log('[seed] Starting...')

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i]
    const chapterOrder = i + 1

    const { rows } = await pool.query(
      `INSERT INTO chapters (title, slug, "order")
       VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, "order" = EXCLUDED."order"
       RETURNING id`,
      [chapter.title, chapter.slug, chapterOrder]
    )

    const chapterId = rows[0].id

    for (let j = 0; j < chapter.lessons.length; j++) {
      const lesson = chapter.lessons[j]
      const lessonOrder = j + 1

      await pool.query(
        `INSERT INTO lessons (chapter_id, title, slug, "order", content)
         VALUES ($1, $2, $3, $4, '')
         ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, "order" = EXCLUDED."order", chapter_id = EXCLUDED.chapter_id`,
        [chapterId, lesson.title, lesson.slug, lessonOrder]
      )
    }

    console.log(`[seed] Chapter ${chapterOrder}: ${chapter.title} (${chapter.lessons.length} lessons)`)
  }

  console.log('[seed] Done.')
  await pool.end()
}

seed().catch((err) => {
  console.error('[seed] FAILED:', err)
  process.exit(1)
})
