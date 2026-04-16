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

type ChapterWithLessons = {
  id: number
  title: string
  slug: string
  order: number
  lessons: Lesson[] | null
}

export async function GET() {
  try {
    const { rows } = await pool.query<ChapterWithLessons>(`
      SELECT c.*,
             json_agg(l.* ORDER BY l.order) AS lessons
      FROM chapters c
      LEFT JOIN lessons l ON l.chapter_id = c.id
      GROUP BY c.id
      ORDER BY c.order
    `)

    return NextResponse.json(rows)
  } catch (err) {
    console.error('[GET /api/chapters]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
