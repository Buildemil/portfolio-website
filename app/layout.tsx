import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Emil Vorbrugg | Designer & Creative Technologist',
  description: 'Creative polymath specializing in design systems, WebGL, AI workflows, and hardware projects. Designer & Creative Technologist at BMW Group.',
  keywords: ['Emil Vorbrugg', 'Designer', 'Creative Technologist', 'WebGL', 'Design Systems', 'AI Workflows', 'BMW', 'Portfolio'],
  authors: [{ name: 'Emil Vorbrugg' }],
  creator: 'Emil Vorbrugg',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emilvorbrugg.com',
    title: 'Emil Vorbrugg | Designer & Creative Technologist',
    description: 'Creative polymath specializing in design systems, WebGL, AI workflows, and hardware projects.',
    siteName: 'Emil Vorbrugg Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emil Vorbrugg | Designer & Creative Technologist',
    description: 'Creative polymath specializing in design systems, WebGL, AI workflows, and hardware projects.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://emilvorbrugg.com" />
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        {/* Jost & Coral Pixels Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Coral+Pixels&display=swap" rel="stylesheet" />
        {/* Vimeo Player */}
        <script src="https://player.vimeo.com/api/player.js" async></script>
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  )
}
