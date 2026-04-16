import Link from 'next/link'
import { notFound } from 'next/navigation'
import pool from '@/lib/db'

type Lesson = {
  id: number
  chapter_id: number
  title: string
  slug: string
  content: string
  order: number
}

type Chapter = {
  id: number
  title: string
  slug: string
  order: number
}

async function getLesson(chapterSlug: string, lessonSlug: string) {
  const { rows } = await pool.query<Lesson & { chapter_title: string; chapter_slug: string }>(
    `SELECT l.*, c.title AS chapter_title, c.slug AS chapter_slug
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     WHERE c.slug = $1 AND l.slug = $2
     LIMIT 1`,
    [chapterSlug, lessonSlug]
  )
  return rows[0] ?? null
}

export default async function LessonPage({
  params,
}: {
  params: { chapterSlug: string; lessonSlug: string }
}) {
  const lesson = await getLesson(params.chapterSlug, params.lessonSlug)

  if (!lesson) notFound()

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

      <div className="prose prose-neutral max-w-none whitespace-pre-wrap">
        {lesson.content || <span className="text-gray-400">Содержимое урока ещё не добавлено.</span>}
      </div>
    </main>
  )
}
