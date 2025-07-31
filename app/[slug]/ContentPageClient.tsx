"use client" // Mark as client component due to Canvas, motion, etc.

import { notFound } from "next/navigation"
import dynamic from "next/dynamic" // Import dynamic
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Dynamically import Canvas and Stars with SSR disabled
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const DynamicStars = dynamic(() => import("@react-three/drei").then((mod) => mod.Stars), { ssr: false })

// Mock content - now back to being hardcoded here
const mockContent: Record<string, { title: string; content: string }> = {
  brands: {
    title: "Recognized Concerns",
    content: `
# Recognized Concerns

Asenturisk Corporation proudly encompasses a diverse portfolio of brands, each of which is a beacon of innovation in its respective domain.

- MuxDay
- MuxAI
- Time Co.
- Amrella
- Codbel Carigors
- THRXT Technologies
- Kodbell-Amrella Media
- VewDew Hundred Corp
- Sawpman Enterprise
- Ulikoo
- Webnova Publishing
- MuktoDMI Studios
- Mux App Division
- Mux Games
- Bongojukti
- Mux Anime Studios
- ICEferno
- Exalux

As time goes on, our list continues to grow evermore stronger and longer. Many a time, we might forget to update or include a few of our subsidiaries. In case we do, please free to request removal of errata.
    `,
  },
  contact: {
    title: "Transmission Hub",
    content: `
# Transmission Hub

Ready to connect with the Asenturisk Corporation? Our communication channels span across multiple dimensions of digital space.

## Physical Location

Our network spans multiple nations, communities and continents for which we are located wherever our members and employees are standing. Thus, we refuse to disclose any locations as being our official headquarters.

## Online Presence

- **YouTube**: /@Asenturisk
- **Facebook**: /asenturisk
- **Instagram**: /asenturisk
- **GitHub**: /asenturisk

Besides these aforementioned platforms, our team may use other profiles in order to interact with customers, investors and critics alike.
    `,
  },
}

export default function ContentPageClient({ params }: { params: { slug: string } }) {
  const content = mockContent[params.slug]

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <DynamicCanvas className="absolute inset-0 -z-10">
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00ffff" />
        <DynamicStars radius={300} depth={60} count={8000} factor={3} saturation={0} fade speed={0.3} />
      </DynamicCanvas>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-8 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Command Center
          </Link>

          <article className="prose prose-invert prose-cyan max-w-none">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                {content.title}
              </h1>
            </div>

            <div className="bg-black/20 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm">
              <div
                className="prose prose-invert prose-cyan max-w-none [&>h1]:text-3xl [&>h1]:text-cyan-400 [&>h1]:font-bold [&>h1]:mb-6 [&>h2]:text-2xl [&>h2]:text-cyan-300 [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:text-cyan-200 [&>h3]:font-medium [&>h3]:mb-3 [&>h3]:mt-6 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:text-gray-300 [&>ul]:mb-4 [&>li]:mb-2 [&>strong]:text-cyan-400 [&>strong]:font-bold"
                dangerouslySetInnerHTML={{
                  __html: content.content
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("# ")) {
                        return `<h1>${line.substring(2)}</h1>`
                      } else if (line.startsWith("## ")) {
                        return `<h2>${line.substring(3)}</h2>`
                      } else if (line.startsWith("### ")) {
                        return `<h3>${line.substring(4)}</h3>`
                      } else if (line.startsWith("- ")) {
                        return `<li>${line.substring(2)}</li>`
                      } else if (line.trim() === "") {
                        return "<br>"
                      } else {
                        return `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`
                      }
                    })
                    .join("")
                    .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>"),
                }}
              />
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}
