'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProgress } from '@/hooks/useProgress'
import type { Chapter } from '@/types'

type Props = {
  chapters: Chapter[]
  mobileOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ chapters, mobileOpen = false, onClose }: Props) {
  const pathname = usePathname()
  const { isCompleted } = useProgress()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-72 bg-white border-r border-gray-200
          flex flex-col overflow-y-auto transition-transform duration-200
          lg:sticky lg:top-0 lg:h-screen lg:z-auto lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link
            href="/lessons"
            className="font-semibold text-sm text-gray-900 hover:text-blue-600"
            onClick={onClose}
          >
            Курс по Claude Code
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
            aria-label="Закрыть меню"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-3 flex-1">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="mb-5">
              <p className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {chapter.order}. {chapter.title}
              </p>

              <ul className="mt-1 space-y-0.5">
                {chapter.lessons?.map((lesson) => {
                  const href = `/lessons/${chapter.slug}/${lesson.slug}`
                  const active = pathname === href
                  const done = isCompleted(lesson.slug)

                  return (
                    <li key={lesson.id}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[10px] font-bold ${
                            done
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {done && '✓'}
                        </span>
                        <span className="leading-snug">{lesson.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
