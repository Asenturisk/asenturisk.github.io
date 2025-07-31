"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic" // Import dynamic
import { motion } from "framer-motion"
import { Search, FileText, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Dynamically import Canvas and Stars with SSR disabled
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const DynamicStars = dynamic(() => import("@react-three/drei").then((mod) => mod.Stars), { ssr: false })

// Mock data for demonstration - in a real app, this would come from your markdown files
const mockResults = [
  {
    title: "About Asenturisk",
    slug: "about",
    excerpt: "Learn about our mission to transcend the boundaries of technology and innovation.",
  },
  {
    title: "Our Projects",
    slug: "projects",
    excerpt: "Discover the cutting-edge projects that define our cosmic journey.",
  },
  {
    title: "Services Overview",
    slug: "services",
    excerpt: "Explore our comprehensive suite of galactic solutions and services.",
  },
  { title: "Contact Information", slug: "contact", excerpt: "Connect with our team across the digital cosmos." },
  {
    title: "Innovation Labs",
    slug: "innovation-labs",
    excerpt: "Where impossible ideas become reality through advanced research.",
  },
  {
    title: "Digital Ecosystem",
    slug: "digital-ecosystem",
    excerpt: "Our interconnected network of applications and platforms.",
  },
]

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<typeof mockResults>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate search
    setLoading(true)
    const timer = setTimeout(() => {
      if (query) {
        const filtered = mockResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
      } else {
        setResults(mockResults)
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.length > 0 ? (
        results.map((result, index) => (
          <motion.div
            key={result.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/${result.slug}`}>
              <div className="group p-6 bg-black/30 border border-cyan-500/20 rounded-xl backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {result.title}
                    </h3>
                    <p className="text-gray-400 mt-2 leading-relaxed">{result.excerpt}</p>
                    <div className="text-sm text-gray-500 mt-3">/{result.slug}</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-xl text-gray-400 mb-2">No results found in the cosmic database</h3>
          <p className="text-gray-500">Try adjusting your search terms to explore different dimensions</p>
        </motion.div>
      )}
    </div>
  )
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <DynamicCanvas className="absolute inset-0 -z-10">
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00ffff" />
        <DynamicStars radius={300} depth={60} count={10000} factor={4} saturation={0} fade speed={0.5} />
      </DynamicCanvas>

      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Command Center
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Database Search
          </h1>

          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative group max-w-2xl">
              <Input
                type="text"
                placeholder="Search the Asenturisk archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-20 bg-black/30 border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-0 rounded-lg transition-all duration-300"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="max-w-4xl">
            {initialQuery && (
              <div className="mb-6 text-gray-400">
                Searching for: <span className="text-cyan-400 font-semibold">"{initialQuery}"</span>
              </div>
            )}
            <SearchResults query={initialQuery} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-cyan-400 text-xl">Loading cosmic database...</div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  )
}
