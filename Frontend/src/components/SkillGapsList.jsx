import React from 'react'

const SkillGapsList = ({ skillGaps = [] }) => {
  if (!skillGaps || skillGaps.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 glass-card rounded-xl border border-slate-800">
        <svg className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium text-slate-200">No major skill gaps identified!</p>
        <p className="text-xs text-slate-400 mt-1">Your background closely aligns with the job requirements.</p>
      </div>
    )
  }

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          label: 'High Priority',
        }
      case 'medium':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          label: 'Medium Priority',
        }
      case 'low':
      default:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          label: 'Low Priority',
        }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {skillGaps.map((gap, idx) => {
        const style = getSeverityBadge(gap.severity)
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${style.bg} ${style.border} flex items-center justify-between gap-3 transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${style.text} bg-current animate-pulse`} />
              <span className="font-semibold text-slate-200 text-sm">{gap.skill}</span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${style.text} border ${style.border}`}
            >
              {style.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default SkillGapsList
