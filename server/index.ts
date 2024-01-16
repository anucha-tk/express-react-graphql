import express from "express";
import { green, yellow } from "colors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

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
  console.log(yellow("-----------------------"));
  console.log(green(`app run on port ${port}`));
});
