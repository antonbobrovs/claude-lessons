'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-xl font-semibold mb-3">Что-то пошло не так</h2>
      <p className="text-gray-500 mb-6">{error.message || 'Не удалось загрузить данные.'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Попробовать снова
      </button>
    </main>
  )
}
