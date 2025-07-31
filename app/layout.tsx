import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asenturisk Corporation - Transcending Reality",
  description:
    "Welcome to the cosmic frontier of innovation. Asenturisk Corporation creates solutions that reshape reality itself.",
  keywords: "innovation, technology, future, cosmic, digital transformation, quantum computing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
    </html>
  )
}
