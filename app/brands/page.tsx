"use client"

import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const brands = [
  "MuxDay",
  "MuxAI",
  "Time Co.",
  "Amrella",
  "Codbel Carigors",
  "THRXT Technologies",
  "Kodbell-Amrella Media",
  "VewDew Hundred Corp",
  "Sawpman Enterprise",
  "Ulikoo",
  "Webnova Publishing",
  "MuktoDMI Studios",
  "Mux App Division",
  "Mux Games",
  "Bongojukti",
  "Mux Anime Studios",
  "ICEferno",
  "Exalux",
]

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Canvas className="absolute inset-0 -z-10">
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00ffff" />
        <Stars radius={300} depth={60} count={8000} factor={3} saturation={0} fade speed={0.3} />
      </Canvas>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-8 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Command Center
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Recognized Concerns
          </h1>

          <div className="bg-black/20 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 leading-relaxed mb-6">
              Asenturisk Corporation proudly encompasses a diverse portfolio of brands, each a beacon of innovation in
              its respective domain.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              {brands.map((brand, index) => (
                <motion.li
                  key={brand}
                  className="flex items-center p-3 bg-black/10 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="text-cyan-400 mr-3">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                  {brand}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
