import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type TodoItem {
    date: String!
    id: ID!
    title: String!
    content: String!
    completed: Boolean!
  }

  type Todos {
    date: String!
    items: [TodoItem!]!
  }

  type Query {
    todos: [Todos]!
  }

  type Mutation {
    addTodo(title: String!, content: String!): TodoItem
    toggleTodoCompleted(id: ID!): TodoItem
    deleteTodo(id: ID!): Boolean
  }
`;
