import Header from '@/components/Header'
import './globals.css'
import { Suspense } from 'react'

export const metadata = {
  title: "Graph Repository",
  description: "A comprehensive benchmark graph repository providing diverse real-world and synthetic graphs with precomputed staistics for algorithm evaluation and research.",
  metadataBase: new URL("https://ucrparlay.github.io/graph-benchmark-website/")
}

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
