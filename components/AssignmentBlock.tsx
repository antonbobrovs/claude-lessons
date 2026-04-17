'use client'
import { useState } from 'react'
import MarkdownContent from '@/components/MarkdownContent'
import { useAssignmentProgress } from '@/hooks/useAssignmentProgress'
import type { Assignment } from '@/types'

export default function AssignmentBlock({ assignment }: { assignment: Assignment }) {
  const { isCompleted, toggle } = useAssignmentProgress()
  const [openHints, setOpenHints] = useState<number[]>([])
  const done = isCompleted(assignment.id)

  function toggleHint(index: number) {
    setOpenHints(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <div className={`border rounded-xl p-6 mb-4 transition-colors ${
      done ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded">
            #{assignment.order}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
        </div>
        <button
          onClick={() => toggle(assignment.id)}
          className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            done
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {done ? '✓ Выполнено' : 'Отметить'}
        </button>
      </div>

      <div className="prose prose-sm prose-neutral max-w-none mb-4">
        <MarkdownContent content={assignment.description} />
      </div>

      {assignment.hints.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">
            Подсказки
          </p>
          {assignment.hints.map((hint, index) => (
            <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleHint(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-sm text-left text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <span>Подсказка {index + 1}</span>
                <span className="text-gray-400 text-xs">
                  {openHints.includes(index) ? '▲' : '▼'}
                </span>
              </button>
              {openHints.includes(index) && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-amber-50 border-t border-gray-100">
                  {hint}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
