import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const ConnectMongo = () => {
    const url = process.env.MONGO_URL;
    mongoose.connect(url);
};
