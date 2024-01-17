import mongoose from "mongoose";
import { logger } from "../logger/logger";

const connectDB = async () => {
  const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_DB}`;
  const conn = await mongoose.connect(uri);

  logger.info(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
