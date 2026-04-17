'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'claude-lessons-progress'

type Progress = Record<string, boolean>

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setProgress(JSON.parse(stored))
    } catch {}
  }, [])

  const complete = useCallback((lessonSlug: string) => {
    setProgress((prev) => {
      const next = { ...prev, [lessonSlug]: true }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (lessonSlug: string) => progress[lessonSlug] === true,
    [progress]
  )

  const completedCount = Object.values(progress).filter(Boolean).length

  return { progress, complete, isCompleted, completedCount }
}
