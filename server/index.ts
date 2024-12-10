import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

// Initialize Apollo Server
const startServer = async (): Promise<void> => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `GraphQL API running at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

// Start the server
startServer().catch((err) => {
  console.error("Error starting server:", err);
});
