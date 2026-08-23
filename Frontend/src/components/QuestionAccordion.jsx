import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ChevronDown, Lightbulb, Target } from 'lucide-react'

const QuestionAccordion = ({ item, index, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation()
    if (item?.answer) {
      navigator.clipboard.writeText(item.answer)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700/80 transition-all duration-200 shadow-md">
      {/* Header / Question Title */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left group cursor-pointer focus:outline-none"
      >
        <div className="flex items-start gap-3.5">
          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/60 text-cyan-400 text-xs font-extrabold flex items-center justify-center mt-0.5 shadow-inner">
            Q{index + 1}
          </span>
          <div>
            <h4 className="font-bold text-slate-100 text-sm sm:text-base group-hover:text-cyan-300 transition-colors leading-snug">
              {item?.question}
            </h4>
            {item?.intention && (
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                <span className="text-slate-500 font-semibold">Interviewer Intent:</span> {item.intention}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="p-1 rounded-lg text-slate-400 group-hover:text-cyan-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="px-4 pb-5 pt-1 border-t border-slate-800/60 bg-slate-950/40 space-y-3.5"
          >
            {/* Intention Detail */}
            {item?.intention && (
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/15">
                <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Target className="w-3.5 h-3.5" /> Why Interviewers Ask This
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.intention}</p>
              </div>
            )}

            {/* Model Answer / Talking Points */}
            {item?.answer && (
              <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> Model Answer & Response Strategy
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="px-3 py-1 text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuestionAccordion
