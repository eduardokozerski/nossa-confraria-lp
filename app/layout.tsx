import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nossa Confraria Buffet | Buffet Premium em Ponte Nova, MG',
  description: 'Buffet de alta gastronomia para casamentos, formaturas e eventos corporativos. Sofisticação, qualidade e experiência única em Ponte Nova e região.',
  keywords: ['buffet', 'casamento', 'eventos', 'Ponte Nova', 'Minas Gerais', 'buffet de fogo', 'gastronomia'],
  openGraph: {
    title: 'Nossa Confraria Buffet | Buffet Premium em Ponte Nova, MG',
    description: 'Buffet de alta gastronomia para casamentos, formaturas e eventos corporativos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport = {
  themeColor: '#1a1918',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
