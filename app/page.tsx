"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image" // Import Image component
import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const placeholders = [
  "apps",
  "music",
  "books",
  "games",
  "articles",
  "services",
  "businesses",
  "products",
  "digital devices",
  "subsidiaries",
  "projects",
  "incentives",
  "funds",
  "websites",
  "clients",
  "software",
  "startups",
  "collections",
  "courses",
  "academies",
  "materials",
  "resources",
  "innovations",
  "electronics",
  "solutions",
]

function SpaceBackground() {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  )
}

function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hue, setHue] = useState(0)
  const [animationInterval, setAnimationInterval] = useState(50) // ms per hue increment
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setHue((prev) => (prev + 1) % 360)
    }, animationInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [animationInterval])

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholders.length)
    }, 1000)

    return () => clearInterval(placeholderInterval)
  }, [])

  const handleMouseEnter = () => setAnimationInterval(5) // 10x faster
  const handleMouseLeave = () => setAnimationInterval(50) // Default speed

  return (
    <div className="text-center space-y-8">
      <motion.h1
        className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          backgroundImage: `linear-gradient(to right, hsl(${hue}, 80%, 60%), hsl(${(hue + 120) % 360}, 80%, 60%), hsl(${(hue + 240) % 360}, 80%, 60%))`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ASENTURISK
      </motion.h1>

      <motion.div
        className="text-xl md:text-2xl text-gray-300 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span>You may know about us from our </span>
        <div className="inline-flex items-center relative h-8 w-64 overflow-hidden align-middle">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              className="absolute left-0 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold"
              initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.3 }}
            >
              {placeholders[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.p
        className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Welcome to the Asentu command center.
      </motion.p>
    </div>
  )
}

function SearchInterface() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
    }
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search through the Asentuverse"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-20 bg-black/30 border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-0 rounded-lg transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </form>
    </motion.div>
  )
}

function NavigationGrid() {
  const navItems = [
    { title: "Brands", href: "/brands", description: "Recognized concerns" },
    { title: "Contact", href: "/contact", description: "Transmission hub" },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      {navItems.map((item, index) => (
        <Link key={item.title} href={item.href}>
          <motion.div
            className="group relative p-6 bg-black/20 border border-cyan-500/20 rounded-xl backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 + index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <SpaceBackground />

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 space-y-16">
        {/* Logo in top-left corner */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link href="/">
            <Image
              src="/asenturisk-logo-2019-white.png"
              alt="Asenturisk Corporation Logo"
              width={80}
              height={80}
              className="filter drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            />
          </Link>
        </motion.div>

        <AnimatedText />
        <SearchInterface />
        <NavigationGrid />

        <motion.div
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <p>© {new Date().getFullYear()} Asenturisk Corporation • Providing better alternatives since 2015.</p>
        </motion.div>
      </div>
    </div>
  )
}
