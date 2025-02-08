import Header from '@/components/Header'
import './globals.css'
import { Suspense } from 'react'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main
          role='main'
          className='py-4 md:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto px-4'>
          {/* TODO: Add fallback to the suspense */}
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
