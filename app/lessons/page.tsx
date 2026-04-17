import pool from '@/lib/db'
import ChapterList from '@/components/ChapterList'
import type { Chapter } from '@/types'

export const dynamic = 'force-dynamic'

async function getChapters(): Promise<Chapter[]> {
  const { rows } = await pool.query<Chapter>(`
    SELECT c.*,
           json_agg(l.* ORDER BY l.order) AS lessons
    FROM chapters c
    LEFT JOIN lessons l ON l.chapter_id = c.id
    GROUP BY c.id
    ORDER BY c.order
  `)
  return rows
}

export default async function LessonsPage() {
  const chapters = await getChapters()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Курс по Claude Code</h1>
      <ChapterList chapters={chapters} />
    </main>
  )
}
