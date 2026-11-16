import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GD Pulse — Новости Geometry Dash',
  description: 'Инди-портал новостей по Geometry Dash на русском и английском языках',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
