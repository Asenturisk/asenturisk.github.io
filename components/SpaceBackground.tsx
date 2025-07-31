"use client"

import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"

export default function SpaceBackground() {
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
