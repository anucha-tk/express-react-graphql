import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./commons/database/db";
import { logger } from "./commons/logger/logger";
dotenv.config();

// connect DB
connectDB();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  }),
);

app.listen(port, () => {
  logger.info(`app run on port ${port}`);
});
