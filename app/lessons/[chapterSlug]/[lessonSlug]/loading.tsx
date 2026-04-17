export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-8" />
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`h-4 bg-gray-100 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded w-48 mt-10" />
    </main>
  )
}
