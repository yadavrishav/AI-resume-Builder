import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react'

const FileUploadDropzone = ({ file, onFileSelect, onFileRemove }) => {
  const fileInputRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    setUploadError('')
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        onFileSelect(droppedFile)
      } else {
        setUploadError('Please select a valid PDF file.')
      }
    }
  }

  const handleFileChange = (e) => {
    setUploadError('')
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      if (selected.type === 'application/pdf' || selected.name.endsWith('.pdf')) {
        onFileSelect(selected)
      } else {
        setUploadError('Please select a valid PDF file.')
      }
    }
  }

  return (
    <div className="w-full space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {file ? (
          // Selected File View Card
          <motion.div
            key="file-selected"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between gap-4 shadow-lg shadow-emerald-950/40 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="flex items-center gap-3.5 min-w-0 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5.5 h-5.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-emerald-300 truncate">
                    {file.name}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB &bull; PDF Resume Uploaded
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onFileRemove}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors relative z-10 cursor-pointer"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          // Dropzone View Card
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-6 sm:p-7 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center gap-2.5 relative overflow-hidden group ${
              isDragOver
                ? 'border-cyan-400 bg-cyan-500/10 glow-cyan scale-[1.01]'
                : 'border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/70'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:text-cyan-300 transition-all shadow-xl shadow-cyan-500/10">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                Click to upload or drag & drop your resume PDF
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Supports PDF files up to 10MB (Optional)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {uploadError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-red-400 font-medium px-1"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </motion.div>
      )}
    </div>
  )
}

export default FileUploadDropzone
