'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProgress } from '@/hooks/useProgress'
import type { Chapter } from '@/types'

export default function Sidebar({ chapters }: { chapters: Chapter[] }) {
  const pathname = usePathname()
  const { isCompleted } = useProgress()

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto bg-white">
      <div className="p-4 border-b border-gray-200">
        <Link href="/lessons" className="font-semibold text-sm text-gray-900 hover:text-blue-600">
          Курс по Claude Code
        </Link>
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
  )
}
