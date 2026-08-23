import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, CheckCircle2, Code2, MessageSquare, Calendar, AlertTriangle, Sparkles, Layers } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MatchScoreRing from '../components/MatchScoreRing'
import PreparationPlanTimeline from '../components/PreparationPlanTimeline'
import QuestionAccordion from '../components/QuestionAccordion'
import SkillGapsList from '../components/SkillGapsList'
import { useInterview } from '../hooks/useInterview'

const Interview = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const { report, fetchReportById, downloadResumePdf, loading, error } = useInterview()

  const [activeTab, setActiveTab] = useState('technical')
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [pdfSuccessMsg, setPdfSuccessMsg] = useState('')

  useEffect(() => {
    if (interviewId) {
      fetchReportById(interviewId)
    }
  }, [interviewId])

  const handleDownloadPdf = async () => {
    if (!report?._id) return
    setDownloadingPdf(true)
    setPdfSuccessMsg('')
    try {
      await downloadResumePdf(report._id)
      setPdfSuccessMsg('Tailored Resume PDF downloaded!')
      setTimeout(() => setPdfSuccessMsg(''), 4000)
    } catch (err) {
      alert('Failed to download PDF. Make sure Puppeteer is installed on backend.')
    } finally {
      setDownloadingPdf(false)
    }
  }

  if (loading) {
    return <LoadingSpinner title="Fetching Your Interview Assessment Details..." />
  }

  if (error || !report) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 glass-panel rounded-3xl border border-red-500/30 text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-white">Report Not Found</h2>
        <p className="text-sm text-slate-400">{error || 'The requested interview report could not be found.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const { title, matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan } = report

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 py-2 relative z-10"
    >
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <button
          onClick={() => navigate('/history')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </button>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {pdfSuccessMsg && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> {pdfSuccessMsg}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer border border-emerald-400/20"
          >
            {downloadingPdf ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Tailored Resume PDF</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
          {/* Target Position Info Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500" />
            <MatchScoreRing score={matchScore || 0} size={110} strokeWidth={9} />

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                Target Role
              </span>
              <h3 className="text-base font-extrabold text-white mt-1.5 line-clamp-2">{title || 'Interview Candidate Assessment'}</h3>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="glass-panel p-2 rounded-2xl border border-slate-800 space-y-1 shadow-lg">
            <button
              onClick={() => setActiveTab('technical')}
              className={`w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'technical'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4" />
                <span>Technical Questions</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-extrabold text-slate-300">
                {technicalQuestions?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('behavioral')}
              className={`w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'behavioral'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Behavioral Qs</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-extrabold text-slate-300">
                {behavioralQuestions?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Prep Roadmap</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-extrabold text-slate-300">
                {preparationPlan?.length || 0} Days
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gaps')}
              className={`w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'gaps'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Skill Gaps</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-extrabold text-slate-300">
                {skillGaps?.length || 0}
              </span>
            </button>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 min-h-[520px] shadow-2xl">
          <AnimatePresence mode="wait">
            {/* Tab 1: Technical Questions */}
            {activeTab === 'technical' && (
              <motion.div
                key="tab-technical"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" /> Technical Questions
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Core domain knowledge & problem-solving scenarios</p>
                </div>

                <div className="space-y-4 pt-2">
                  {technicalQuestions && technicalQuestions.length > 0 ? (
                    technicalQuestions.map((q, idx) => (
                      <QuestionAccordion key={idx} item={q} index={idx} defaultOpen={idx === 0} />
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No technical questions available.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Behavioral Questions */}
            {activeTab === 'behavioral' && (
              <motion.div
                key="tab-behavioral"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" /> Behavioral & Situational Qs
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Leadership, collaboration, & STAR response frameworks</p>
                </div>

                <div className="space-y-4 pt-2">
                  {behavioralQuestions && behavioralQuestions.length > 0 ? (
                    behavioralQuestions.map((q, idx) => (
                      <QuestionAccordion key={idx} item={q} index={idx} defaultOpen={idx === 0} />
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">No behavioral questions available.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Preparation Roadmap */}
            {activeTab === 'roadmap' && (
              <motion.div
                key="tab-roadmap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Day-by-Day Preparation Plan
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Structured study schedule to maximize your interview performance</p>
                </div>

                <div className="pt-2">
                  <PreparationPlanTimeline plan={preparationPlan} />
                </div>
              </motion.div>
            )}

            {/* Tab 4: Skill Gaps */}
            {activeTab === 'gaps' && (
              <motion.div
                key="tab-gaps"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" /> Skill Gap Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Prioritized list of technical areas to review before your interview</p>
                </div>

                <div className="pt-2">
                  <SkillGapsList skillGaps={skillGaps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )
}

export default Interview
