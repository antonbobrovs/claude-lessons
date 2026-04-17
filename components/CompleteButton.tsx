'use client'
import { useProgress } from '@/hooks/useProgress'

export default function CompleteButton({ lessonSlug }: { lessonSlug: string }) {
  const { isCompleted, complete } = useProgress()
  const done = isCompleted(lessonSlug)

  return (
    <button
      onClick={() => complete(lessonSlug)}
      disabled={done}
      className={`mt-10 px-6 py-3 rounded-lg font-medium transition-colors ${
        done
          ? 'bg-green-100 text-green-700 cursor-default'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {done ? '✓ Урок завершён' : 'Отметить как завершённый'}
    </button>
  )
}
