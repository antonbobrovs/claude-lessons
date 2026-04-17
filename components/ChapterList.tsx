import Link from 'next/link'
import type { Chapter } from '@/types'

type Props = {
  chapters: Chapter[]
}

export default function ChapterList({ chapters }: Props) {
  if (chapters.length === 0) {
    return <p className="text-gray-500">Главы ещё не добавлены.</p>
  }

  return (
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
  )
}
