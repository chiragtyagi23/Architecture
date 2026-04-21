import type { Metadata } from 'next'
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes' })

export const metadata: Metadata = {
  title: 'Realstate – Manage Your Property',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${greatVibes.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

