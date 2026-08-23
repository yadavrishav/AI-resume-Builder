const mongoose = require("mongoose")



async function connectToDB() {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    try {
        const uri = process.env.MONGO_URI || "mongodb+srv://rishavyadav6997_db_user:Jp5PYTZaTZAPrCCG@cluster0.gnsa7s5.mongodb.net/interview-ai-yt?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(uri)
        console.log("Connected to Database")
    }
    catch (err) {
        console.error("Database connection error:", err)
    }
}

module.exports = connectToDB