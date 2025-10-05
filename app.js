
import "./server.js";
import bodyParser from "body-parser";
import express from "express";

import { dbConnection } from "./dbConnection.js";
import { graphqlHTTP } from "express-graphql";
const app = express();
app.use(bodyParser.json());
dbConnection;

app.use("/graphql",graphqlHTTP({
    
}))