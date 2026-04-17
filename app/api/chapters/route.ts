import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { Chapter } from '@/types'

export async function GET() {
  try {
    const { rows } = await pool.query<Chapter>(`
      SELECT c.*,
             json_agg(
               json_build_object(
                 'id', l.id,
                 'chapter_id', l.chapter_id,
                 'title', l.title,
                 'slug', l.slug,
                 'content', l.content,
                 'order', l.order
               ) ORDER BY l.order
             ) FILTER (WHERE l.id IS NOT NULL) AS lessons
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
