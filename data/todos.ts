import { v4 as uuidv4 } from "uuid";

export const mockTodos = [
  {
    id: uuidv4(),
    title: "Do something",
    content: "Here is some content",
    completed: false
  },
  {
    id: uuidv4(),
    title: "Do something else",
    content: "Here is some content",
    completed: false
  },
  {
    id: uuidv4(),
    title: "Do something else again",
    content: "Here is some content",
    completed: false
  }
];
