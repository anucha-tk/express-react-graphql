import mongoose from "mongoose";
import { logger } from "../logger/logger";

const connectDB = async () => {
  const uri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PWD}@127.0.0.1:27017/${process.env.DATABASE_NAME}`;
  const conn = await mongoose.connect(uri);

  logger.info(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
