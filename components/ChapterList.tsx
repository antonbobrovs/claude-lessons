'use client'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import type { Chapter } from '@/types'

type Props = {
  chapters: Chapter[]
}

export default function ChapterList({ chapters }: Props) {
  const { isCompleted } = useProgress()

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
              {chapter.lessons.map((lesson) => {
                const done = isCompleted(lesson.slug)
                return (
                  <li key={lesson.id} className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        done
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {done && '✓'}
                    </span>
                    <Link
                      href={`/lessons/${chapter.slug}/${lesson.slug}`}
                      className={`text-sm hover:underline ${done ? 'text-gray-400' : 'text-blue-600'}`}
                    >
                      {chapter.order}.{lesson.order} {lesson.title}
                    </Link>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p className="pl-4 text-gray-400 text-sm">Уроков пока нет.</p>
          )}
        </li>
      ))}
    </ol>
  )
}
