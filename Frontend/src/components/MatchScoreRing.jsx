import React from 'react'

const MatchScoreRing = ({ score = 0, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedScore = Math.min(100, Math.max(0, score))
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference

  let scoreColor = '#10b981' // Green (>75)
  let badgeLabel = 'High Match'
  let bgGlow = 'rgba(16, 185, 129, 0.15)'

  if (clampedScore < 50) {
    scoreColor = '#ef4444' // Red (<50)
    badgeLabel = 'Needs Improvement'
    bgGlow = 'rgba(239, 68, 68, 0.15)'
  } else if (clampedScore < 75) {
    scoreColor = '#f59e0b' // Amber (50-74)
    badgeLabel = 'Moderate Match'
    bgGlow = 'rgba(245, 158, 11, 0.15)'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Glow Ring */}
        <div
          className="absolute inset-0 rounded-full blur-xl transition-all duration-700"
          style={{ background: bgGlow }}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground score progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {clampedScore}
            <span className="text-sm text-slate-400 font-normal">%</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
            Score
          </span>
        </div>
      </div>

      <div
        className="mt-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
        style={{
          color: scoreColor,
          borderColor: `${scoreColor}33`,
          backgroundColor: `${scoreColor}15`,
        }}
      >
        {badgeLabel}
      </div>
    </div>
  )
}

export default MatchScoreRing
