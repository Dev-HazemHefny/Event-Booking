
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./dbConnection.js";
import { graphqlHTTP } from "express-graphql";
import schema  from "./GraphQl/Schema/schema.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
dbConnection;

app.use("/graphql"
    ,graphqlHTTP({
schema,
graphiql:true
}
));
export default app;