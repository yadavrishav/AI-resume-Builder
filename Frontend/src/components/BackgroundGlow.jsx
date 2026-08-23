import React, { useEffect, useState } from 'react'

const BackgroundGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Mouse Following Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 80%)',
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
        }}
      />

      {/* Animated Floating Gradient Blobs */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[130px] animate-blob" />
      <div className="absolute top-[30%] right-[10%] w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[140px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[150px] animate-blob animation-delay-4000" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  )
}

export default BackgroundGlow
