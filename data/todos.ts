import { v4 as uuidv4 } from "uuid";

export const mockTodos = [
  {
    id: uuidv4(),
    title: "Do something",
    completed: false
  },
  {
    id: uuidv4(),
    title: "Do something else",
    completed: false
  },
  {
    id: uuidv4(),
    title: "Do something else again",
    completed: false
  }
];
