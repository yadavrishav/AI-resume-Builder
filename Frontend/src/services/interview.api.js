import axiosInstance from './axiosInstance'

export const generateInterviewReport = async (formData) => {
  const response = await axiosInstance.post('/interview/generate-interview-report', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getReportById = async (interviewId) => {
  const response = await axiosInstance.get(`/interview/report/${interviewId}`)
  return response.data
}

export const getAllInterviewReports = async () => {
  const response = await axiosInstance.get('/interview/reports')
  return response.data
}

export const getResumePdf = async (interviewReportId) => {
  const response = await axiosInstance.get(`/interview/generate-resume-pdf/${interviewReportId}`, {
    responseType: 'blob',
  })
  return response.data
}
