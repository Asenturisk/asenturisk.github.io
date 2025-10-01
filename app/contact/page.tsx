"use client"

import dynamic from "next/dynamic"
import { ArrowLeft, Github, Linkedin, Youtube, Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const DynamicStars = dynamic(() => import("@react-three/drei").then((mod) => mod.Stars), { ssr: false })

export default function ContactPage() {
  const platforms = [
    { name: "YouTube", icon: <Youtube />, url: "https://www.youtube.com/@Asenturisk" },
    { name: "Facebook", icon: <Facebook />, url: "https://www.facebook.com/asenturisk" },
    { name: "Instagram", icon: <Instagram />, url: "https://www.instagram.com/asenturisk" },
    { name: "GitHub", icon: <Github />, url: "https://github.com/asenturisk" },
    { name: "LinkedIn", icon: <Linkedin />, url: "https://www.linkedin.com/company/asenturisk" },
    { name: "HuggingFace", icon: <img src="/huggingface-icon.svg" alt="HuggingFace" className="w-5 h-5" />, url: "https://huggingface.co/asenturisk" },
  ]

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

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Transmission Hub
          </h1>

          <div className="bg-black/20 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 leading-relaxed mb-6">
              Ready to connect with the Asenturisk Corporation? Our communication channels span across multiple dimensions of digital space.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our network spans multiple nations, communities and continents for which we are located wherever our members and employees are standing. Thus, we refuse to disclose any locations as being our official headquarters.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              {platforms.map((p) => (
                <Link key={p.name} href={p.url} target="_blank" className="flex items-center gap-2 text-gray-200 hover:text-cyan-400 transition-colors">
                  <span className="w-5 h-5">{p.icon}</span>
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Besides these aforementioned platforms, our team may use other profiles in order to interact with customers, investors and critics alike. However, please be aware if they are actual authorized members of Asenturisk. Our staff would never threaten or request for any sort of sensitive information from our clients.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
