import { gql } from "graphql-tag";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      date
      items {
        id
        title
        content
        completed
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $content: String!) {
    addTodo(title: $title, content: $content) {
      id
      title
      content
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
