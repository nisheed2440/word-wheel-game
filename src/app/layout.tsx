import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Word Wheel Game',
  description: 'Challenge your vocabulary with our interactive word wheel game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
