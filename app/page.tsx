import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <Link href="/lessons" className="text-blue-600 hover:underline">
        Перейти к курсу
      </Link>
    </main>
  )
}
