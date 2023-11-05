import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Mr.carousel',
  description: 'Make your ai carousel in a minute',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=' pattern1'>

        <main className=" mx-auto ">
          {children}
        </main>
      </body>
    </html>
  )
}
