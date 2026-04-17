'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'claude-lessons-assignments'

type AssignmentProgress = Record<number, boolean>

export function useAssignmentProgress() {
  const [progress, setProgress] = useState<AssignmentProgress>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setProgress(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = useCallback((assignmentId: number) => {
    setProgress(prev => {
      const next = { ...prev, [assignmentId]: !prev[assignmentId] }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (assignmentId: number) => progress[assignmentId] === true,
    [progress]
  )

  const completedCount = Object.values(progress).filter(Boolean).length

  return { progress, toggle, isCompleted, completedCount }
}
