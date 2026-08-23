const mongoose = require("mongoose")



async function connectToDB() {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/interview-ai-yt"
        await mongoose.connect(uri)
        console.log("Connected to Database")
    }
    catch (err) {
        console.error("Database connection error:", err)
    }
}

module.exports = connectToDB