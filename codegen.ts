import { CodegenConfig } from "@graphql-codegen/cli";
import * as path from "path";

const config: CodegenConfig = {
  schema: path.join(__dirname, "./server/schema.ts"), // Path to your schema file
  documents: "./queries/**/*.ts", // No GraphQL queries here since we are generating types for queries/mutations separately
  generates: {
    "./generated/graphql.tsx": {
      plugins: [
        "typescript", // Generate TypeScript types
        "typescript-operations", // Generate types for operations (queries/mutations)
        "typescript-react-apollo" // Generate React Apollo hooks (e.g., useQuery, useMutation)
      ]
    }
  }
};

export default config;
