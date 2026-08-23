import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">InterviewAI</span>
          <span>&bull;</span>
          <span>AI-Powered Career Intelligence</span>
        </div>
        <p>&copy; {new Date().getFullYear()} InterviewAI. Powered by Google Gemini AI & Puppeteer.</p>
      </div>
    </footer>
  )
}

export default Footer
