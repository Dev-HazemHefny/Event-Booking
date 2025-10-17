import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { dbConnection } from "./dbConnection.js";
import schema from "./GraphQl/schema.js";

// Database connection
dbConnection;

// Create Apollo Server with context function
const server = new ApolloServer({
  schema,
  introspection: true,
});

// Start standalone server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;
    
    let user = null;
    
    if (authHeader) {
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      try {
        user = jwt.verify(token, "mearn"); // Your JWT secret
        // console.log("✅ Authenticated user:", user);
      } catch (err) {
        // console.log("❌ JWT Error:", err.message);
        user = null;
      }
    }

    return { user };
  },
});

console.log(`🚀 Server ready at ${url}`);