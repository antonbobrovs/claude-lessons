export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-6" />
      <div className="h-3 bg-gray-200 rounded w-full mb-8" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="mb-8">
          <div className="h-5 bg-gray-200 rounded w-48 mb-3" />
          <div className="space-y-2 pl-4 border-l-2 border-gray-100">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-100 rounded w-72" />
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
