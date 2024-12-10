import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo
    toggleTodoCompleted(id: ID!): Todo
  }
`;
