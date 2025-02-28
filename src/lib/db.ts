import mongoose from "mongoose";
import { env } from "../constants";

const MONGO_URI = env.mongoDbUri || "your_mongodb_connection_string";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;