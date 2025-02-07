import Header from '@/components/Header'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main
          role='main'
          className='md:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto px-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
