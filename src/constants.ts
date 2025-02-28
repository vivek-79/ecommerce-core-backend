import dotenv from "dotenv";

dotenv.config();

export const env ={
    mongoDbUri:process.env.MONGO_URI,
    port: process.env.PORT,
    accessTokenSecret: process.env.ACCESSTOKENSECRET!,
    refreshTokenSecret: process.env.ACCESSTOKENSECRET!,
}

