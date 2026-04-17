'use client'
import { useProgress } from '@/hooks/useProgress'
import type { Chapter } from '@/types'

export default function ProgressBar({ chapters }: { chapters: Chapter[] }) {
  const { isCompleted } = useProgress()

  const total = chapters.reduce((acc, ch) => acc + (ch.lessons?.length ?? 0), 0)
  const completed = chapters.reduce(
    (acc, ch) => acc + (ch.lessons?.filter((l) => isCompleted(l.slug)).length ?? 0),
    0
  )

  if (total === 0) return null

  const pct = Math.round((completed / total) * 100)

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Прогресс курса</span>
        <span>{completed} из {total} уроков</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
