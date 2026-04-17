import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import pool from '@/lib/db'
import MarkdownContent from '@/components/MarkdownContent'
import CompleteButton from '@/components/CompleteButton'
import AssignmentList from '@/components/AssignmentList'
import type { LessonWithNav, Assignment } from '@/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { chapterSlug: string; lessonSlug: string }
}): Promise<Metadata> {
  const lesson = await getLesson(params.chapterSlug, params.lessonSlug)
  if (!lesson) return {}
  return {
    title: lesson.title,
    description: `${lesson.chapter_title} — ${lesson.title}`,
  }
}

async function getLesson(chapterSlug: string, lessonSlug: string): Promise<LessonWithNav | null> {
  const { rows } = await pool.query<{
    id: number
    chapter_id: number
    title: string
    slug: string
    content: string
    order: number
    chapter_title: string
    chapter_slug: string
    prev_lesson_slug: string | null
    prev_chapter_slug: string | null
    prev_title: string | null
    next_lesson_slug: string | null
    next_chapter_slug: string | null
    next_title: string | null
  }>(
    `WITH ordered AS (
       SELECT
         l.id, l.chapter_id, l.title, l.slug, l.content, l.order,
         c.title  AS chapter_title,
         c.slug   AS chapter_slug,
         LAG(l.slug)   OVER (ORDER BY c.order, l.order) AS prev_lesson_slug,
         LAG(c.slug)   OVER (ORDER BY c.order, l.order) AS prev_chapter_slug,
         LAG(l.title)  OVER (ORDER BY c.order, l.order) AS prev_title,
         LEAD(l.slug)  OVER (ORDER BY c.order, l.order) AS next_lesson_slug,
         LEAD(c.slug)  OVER (ORDER BY c.order, l.order) AS next_chapter_slug,
         LEAD(l.title) OVER (ORDER BY c.order, l.order) AS next_title
       FROM lessons l
       JOIN chapters c ON c.id = l.chapter_id
     )
     SELECT * FROM ordered
     WHERE chapter_slug = $1 AND slug = $2
     LIMIT 1`,
    [chapterSlug, lessonSlug]
  )

  if (rows.length === 0) return null

  const row = rows[0]
  return {
    id: row.id,
    chapter_id: row.chapter_id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    order: row.order,
    chapter_title: row.chapter_title,
    chapter_slug: row.chapter_slug,
    prev: row.prev_lesson_slug
      ? { chapterSlug: row.prev_chapter_slug!, lessonSlug: row.prev_lesson_slug, title: row.prev_title! }
      : null,
    next: row.next_lesson_slug
      ? { chapterSlug: row.next_chapter_slug!, lessonSlug: row.next_lesson_slug, title: row.next_title! }
      : null,
  }
}

async function getAssignments(lessonId: number): Promise<Assignment[]> {
  const { rows } = await pool.query<{
    id: number
    lesson_id: number
    title: string
    description: string
    hints: string[]
    order: number
  }>(
    `SELECT id, lesson_id, title, description, hints, "order"
     FROM assignments
     WHERE lesson_id = $1
     ORDER BY "order" ASC`,
    [lessonId]
  )
  return rows.map(row => ({
    id: row.id,
    lesson_id: row.lesson_id,
    title: row.title,
    description: row.description,
    hints: Array.isArray(row.hints) ? row.hints : [],
    order: row.order,
  }))
}

export default async function LessonPage({
  params,
}: {
  params: { chapterSlug: string; lessonSlug: string }
}) {
  const lesson = await getLesson(params.chapterSlug, params.lessonSlug)

  if (!lesson) notFound()

  const assignments = await getAssignments(lesson.id)

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/lessons" className="hover:underline">
          Все главы
        </Link>
        {' / '}
        <span>{lesson.chapter_title}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">{lesson.title}</h1>

      <MarkdownContent content={lesson.content} />

      <AssignmentList assignments={assignments} />

      <CompleteButton lessonSlug={lesson.slug} />

      <nav className="mt-12 flex justify-between gap-4 border-t pt-6">
        {lesson.prev ? (
          <Link
            href={`/lessons/${lesson.prev.chapterSlug}/${lesson.prev.lessonSlug}`}
            className="flex flex-col items-start text-sm text-blue-600 hover:underline max-w-[45%]"
          >
            <span className="text-gray-400 mb-1">← Назад</span>
            <span>{lesson.prev.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {lesson.next ? (
          <Link
            href={`/lessons/${lesson.next.chapterSlug}/${lesson.next.lessonSlug}`}
            className="flex flex-col items-end text-sm text-blue-600 hover:underline max-w-[45%]"
          >
            <span className="text-gray-400 mb-1">Вперёд →</span>
            <span className="text-right">{lesson.next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  )
}
