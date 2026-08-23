import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Code2, Target, FileCheck } from 'lucide-react'
import FileUploadDropzone from '../components/FileUploadDropzone'
import LoadingSpinner from '../components/LoadingSpinner'
import { useInterview } from '../hooks/useInterview'

const Home = () => {
  const [file, setFile] = useState(null)
  const [selfDescription, setSelfDescription] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [formError, setFormError] = useState('')

  const { generateReport, loading } = useInterview()
  const navigate = useNavigate()

  const MAX_JOB_DESC_LENGTH = 5000

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!jobDescription.trim()) {
      setFormError('Please enter the target Job Description.')
      return
    }

    if (!file && !selfDescription.trim()) {
      setFormError('Please upload your Resume PDF or enter a brief Self Description.')
      return
    }

    const formData = new FormData()
    if (file) {
      formData.append('resume', file)
    }
    formData.append('selfDescription', selfDescription)
    formData.append('jobDescription', jobDescription)

    try {
      const createdReport = await generateReport(formData)
      if (createdReport && createdReport._id) {
        navigate(`/interview/${createdReport._id}`)
      }
    } catch (err) {
      setFormError(err.message || 'Failed to generate interview report. Please try again.')
    }
  }

  if (loading) {
    return <LoadingSpinner title="Generating Your AI Interview Assessment..." />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl sm:max-w-4xl mx-auto space-y-9 py-2 relative z-10"
    >
      {/* Hero Header */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[11px] font-extrabold uppercase tracking-widest shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
          <span>AI-Powered Career Co-Pilot</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight"
        >
          Prepare for Your Next{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Dream Job
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Upload your resume and target job description. Gemini AI will generate technical questions, model answers, behavioral strategy, skill gap analysis, and a tailored resume.
        </motion.p>
      </div>

      {/* Main Assessment Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-7 relative overflow-hidden"
      >
        {/* Subtle Top Card Highlight Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600" />

        {/* Error Alert */}
        <AnimatePresence>
          {formError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs sm:text-sm text-red-400 shadow-lg shadow-red-950/20"
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold">{formError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Resume PDF Upload */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 text-[11px] flex items-center justify-center font-bold">1</span>
                <span>Upload Resume PDF (Recommended)</span>
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recommended
              </span>
            </div>

            <FileUploadDropzone
              file={file}
              onFileSelect={(selectedFile) => setFile(selectedFile)}
              onFileRemove={() => setFile(null)}
            />
          </div>

          {/* Step 2: Self Description */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-400 text-[11px] flex items-center justify-center font-bold">2</span>
                <span>Self Description / Additional Experience (Optional)</span>
              </label>
              <span className="text-[11px] text-slate-500 font-semibold">Optional</span>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="e.g. Full-stack developer with 3 years of experience in React, Node.js, and MongoDB. Built scalable web apps and led a team of 4 engineers..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Step 3: Job Description (Required) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 text-[11px] flex items-center justify-center font-bold">3</span>
                <span>Target Job Description</span>
                <span className="text-cyan-400 font-bold text-sm">*</span>
              </label>

              {/* Dynamic Character Counter Bar */}
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[11px] font-semibold ${
                    jobDescription.length > MAX_JOB_DESC_LENGTH ? 'text-red-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  {jobDescription.length} / {MAX_JOB_DESC_LENGTH}
                </span>
                <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (jobDescription.length / MAX_JOB_DESC_LENGTH) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here (e.g. qualifications, key responsibilities, tech stack requirements)..."
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Premium CTA Button */}
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group border border-cyan-400/20"
          >
            <Sparkles className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span>Generate AI Interview Report</span>
            <ArrowRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </motion.div>

      {/* Interactive Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          <div>
            <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1.5 group-hover:text-cyan-300 transition-colors">
              Technical & Behavioral Q&As
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get precise questions with interviewer intent & ideal response strategies.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-bold text-cyan-400">
            <span>Model Answers Included</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
          <div>
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1.5 group-hover:text-indigo-300 transition-colors">
              Skill Gap & Match Score
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant match rating with prioritized skill deficiency breakdown.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-bold text-indigo-400">
            <span>0–100% Match Gauge</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <div>
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1.5 group-hover:text-purple-300 transition-colors">
              ATS Tailored Resume PDF
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate and download an optimized PDF resume tailored for the job.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-bold text-purple-400">
            <span>Puppeteer PDF Export</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Home
