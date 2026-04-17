'use client'
import AssignmentBlock from '@/components/AssignmentBlock'
import type { Assignment } from '@/types'

export default function AssignmentList({ assignments }: { assignments: Assignment[] }) {
  if (assignments.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Практические задания</h2>
      {assignments.map(a => (
        <AssignmentBlock key={a.id} assignment={a} />
      ))}
    </section>
  )
}
