import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("Database connected");
        } else {
            console.log("Database connection skipped - MONGO_URI not configured");
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
        console.log("Continuing without database connection...");
    }
}

export default connectDB