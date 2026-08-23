import React, { createContext, useState } from 'react'
import {
  generateInterviewReport as apiGenerateReport,
  getAllInterviewReports as apiGetAllReports,
  getReportById as apiGetReportById,
  getResumePdf as apiGetResumePdf,
} from '../services/interview.api'

export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
  const [report, setReport] = useState(null)
  const [reportsList, setReportsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateReport = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGenerateReport(formData)
      if (data && data.interviewReport) {
        setReport(data.interviewReport)
        return data.interviewReport
      }
      throw new Error('Failed to generate interview report.')
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Something went wrong.'
      setError(errMsg)
      throw new Error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const fetchReportById = async (interviewId) => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGetReportById(interviewId)
      if (data && data.interviewReport) {
        setReport(data.interviewReport)
        return data.interviewReport
      }
      throw new Error('Interview report not found.')
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to load report.'
      setError(errMsg)
      throw new Error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllReports = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGetAllReports()
      if (data && data.interviewReports) {
        setReportsList(data.interviewReports)
        return data.interviewReports
      }
      return []
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to load history.'
      setError(errMsg)
      return []
    } finally {
      setLoading(false)
    }
  }

  const downloadResumePdf = async (interviewReportId) => {
    try {
      const blob = await apiGetResumePdf(interviewReportId)
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `tailored_resume_${interviewReportId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF download error:', err)
      throw new Error('Failed to download resume PDF.')
    }
  }

  return (
    <InterviewContext.Provider
      value={{
        report,
        setReport,
        reportsList,
        loading,
        error,
        setError,
        generateReport,
        fetchReportById,
        fetchAllReports,
        downloadResumePdf,
      }}
    >
      {children}
    </InterviewContext.Provider>
  )
}
