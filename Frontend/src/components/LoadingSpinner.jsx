import React, { useEffect, useState } from 'react'

const TIPS = [
  "Analyzing job requirements & key skill demands...",
  "Parsing candidate background & matching competencies...",
  "Formulating targeted technical questions & model answers...",
  "Drafting behavioral scenario questions with interviewer intent...",
  "Building customized day-by-day preparation roadmap...",
  "Generating ATS-friendly tailored resume PDF..."
]

const LoadingSpinner = ({ title = "Analyzing Your Profile with Gemini AI..." }) => {
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing ring */}
        <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        {/* Inner reverse spinner */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-indigo-500/20 border-b-indigo-400 animate-spin flex items-center justify-center" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        {/* AI Icon center */}
        <div className="absolute text-cyan-400 animate-pulse">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent mb-2">
        {title}
      </h3>

      <div className="h-6 overflow-hidden">
        <p key={tipIndex} className="text-sm text-cyan-400 font-medium animate-fade-in transition-all">
          {TIPS[tipIndex]}
        </p>
      </div>

      <p className="text-xs text-slate-500 mt-4 max-w-sm">
        This usually takes 10–20 seconds as Gemini processes the candidate match details. Please don't refresh.
      </p>
    </div>
  )
}

export default LoadingSpinner
