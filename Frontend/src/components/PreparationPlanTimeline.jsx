import React from 'react'

const PreparationPlanTimeline = ({ plan = [] }) => {
  if (!plan || plan.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 glass-card rounded-xl border border-slate-800">
        <p className="text-sm">No preparation roadmap available.</p>
      </div>
    )
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {plan.map((dayItem, idx) => (
        <div key={idx} className="relative group">
          {/* Day marker node */}
          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:border-cyan-300 group-hover:scale-110 transition-all flex items-center justify-center shadow-md shadow-cyan-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>

          {/* Card Content */}
          <div className="glass-card p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                Day {dayItem.day}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {dayItem.focus}
              </span>
            </div>

            {/* Task list */}
            {dayItem.tasks && dayItem.tasks.length > 0 && (
              <ul className="mt-3 space-y-2">
                {dayItem.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PreparationPlanTimeline
