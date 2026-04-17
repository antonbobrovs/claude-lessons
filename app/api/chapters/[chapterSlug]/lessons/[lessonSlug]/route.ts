import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { LessonWithNav } from '@/types'

type Params = { chapterSlug: string; lessonSlug: string }

export async function GET(
  _req: Request,
  { params }: { params: Params }
) {
  const { chapterSlug, lessonSlug } = params

  try {
    // Fetch all lessons ordered globally, then find current + prev/next
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

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    const row = rows[0]

    const result: LessonWithNav = {
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

    return NextResponse.json(result)
  } catch (err) {
    console.error('[GET /api/chapters/.../lessons/...]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
