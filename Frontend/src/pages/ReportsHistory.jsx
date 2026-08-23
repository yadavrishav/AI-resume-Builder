import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Plus, ArrowRight, FileText, Calendar, Sparkles } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MatchScoreRing from '../components/MatchScoreRing'
import { useInterview } from '../hooks/useInterview'

const ReportsHistory = () => {
  const { reportsList, fetchAllReports, loading } = useInterview()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReports()
  }, [])

  if (loading) {
    return <LoadingSpinner title="Loading Your Past Interview Prep Reports..." />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 py-2 relative z-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>Interview Assessment History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past interview reports, match scores, and tailored prep roadmaps
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Assessment</span>
          </Link>
        </motion.div>
      </div>

      {/* Reports Grid */}
      {reportsList && reportsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportsList.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => navigate(`/interview/${item._id}`)}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 inline-block mb-1.5">
                    Target Role
                  </span>
                  <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.title || 'Interview Candidate Assessment'}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <MatchScoreRing score={item.matchScore || 0} size={75} strokeWidth={6} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 transition-colors font-semibold">
                <span>View Assessment Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl border border-slate-800 text-center max-w-md mx-auto space-y-4 my-8 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-extrabold text-white">No Reports Generated Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload your resume and job description on the home page to generate your first AI-powered interview assessment.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Start First Assessment</span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ReportsHistory
