import pool from '@/lib/db'
import LessonsShell from '@/components/LessonsShell'
import type { Chapter } from '@/types'

export const dynamic = 'force-dynamic'

async function getChapters(): Promise<Chapter[]> {
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
  return rows
}

export default async function LessonsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chapters = await getChapters()

  return <LessonsShell chapters={chapters}>{children}</LessonsShell>
}
