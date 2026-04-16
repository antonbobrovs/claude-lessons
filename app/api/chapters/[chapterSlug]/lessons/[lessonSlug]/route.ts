import { NextResponse } from 'next/server'
import pool from '@/lib/db'

type Lesson = {
  id: number
  chapter_id: number
  title: string
  slug: string
  content: string
  order: number
}

type Params = { chapterSlug: string; lessonSlug: string }

export async function GET(
  _req: Request,
  { params }: { params: Params }
) {
  const { chapterSlug, lessonSlug } = params

  try {
    const { rows } = await pool.query<Lesson>(
      `SELECT l.*
       FROM lessons l
       JOIN chapters c ON c.id = l.chapter_id
       WHERE c.slug = $1 AND l.slug = $2
       LIMIT 1`,
      [chapterSlug, lessonSlug]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    console.error('[GET /api/chapters/.../lessons/...]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
