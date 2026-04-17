import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Курс по Claude Code',
    template: '%s | Курс по Claude Code',
  },
  description: 'Полное введение в разработку с Claude Code — от установки до автономных агентов.',
  metadataBase: new URL('https://claudelessons.insight-navigator.ru'),
  openGraph: {
    siteName: 'Курс по Claude Code',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
