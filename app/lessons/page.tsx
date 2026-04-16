import Link from 'next/link'
import pool from '@/lib/db'

export const dynamic = 'force-dynamic'

type Lesson = {
  id: number
  title: string
  slug: string
  order: number
}

type Chapter = {
  id: number
  title: string
  slug: string
  order: number
  lessons: Lesson[] | null
}

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

      {chapters.length === 0 && (
        <p className="text-gray-500">Главы ещё не добавлены.</p>
      )}

      <ol className="space-y-8">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <h2 className="text-xl font-semibold mb-3">
              {chapter.order}. {chapter.title}
            </h2>

            {chapter.lessons && chapter.lessons.length > 0 ? (
              <ol className="space-y-1 pl-4 border-l-2 border-gray-200">
                {chapter.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lessons/${chapter.slug}/${lesson.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {chapter.order}.{lesson.order} {lesson.title}
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="pl-4 text-gray-400 text-sm">Уроков пока нет.</p>
            )}
          </li>
        ))}
      </ol>
    </main>
  )
}
