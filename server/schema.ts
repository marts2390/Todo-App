import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    content: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, content: String!): Todo
    toggleTodoCompleted(id: ID!): Todo
    deleteTodo(id: ID!): Boolean
  }
`;
