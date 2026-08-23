const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()



// Generate Interview Report (supports / and /generate-interview-report)
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)
interviewRouter.post("/generate-interview-report", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

// Get Report by ID
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

// Get All Reports (supports / and /reports)
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)
interviewRouter.get("/reports", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

// Generate Resume PDF (supports GET and POST on /resume/pdf/:interviewReportId & /generate-resume-pdf/:interviewReportId)
interviewRouter.get("/generate-resume-pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)
interviewRouter.post("/generate-resume-pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)
interviewRouter.get("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)




module.exports = interviewRouter