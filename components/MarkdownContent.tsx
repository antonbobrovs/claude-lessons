'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function MarkdownContent({ content }: { content: string }) {
  if (!content) {
    return <p className="text-gray-400">Содержимое урока ещё не добавлено.</p>
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="prose prose-neutral max-w-none"
    >
      {content}
    </ReactMarkdown>
  )
}
