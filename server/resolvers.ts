import { mockTodos } from "../data/todos";
import { AddTodoSchema, ToggleTodoCompletedSchema } from "./validation";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const todos: Todo[] = mockTodos;

export const resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    addTodo: (_: unknown, args: { title: string }) => {
      const validationResult = AddTodoSchema.safeParse(args);

      if (!validationResult.success) {
        throw new Error(`Validation Error: ${validationResult.error.message}`);
      }

      const { title } = validationResult.data;

      const newTodo: Todo = {
        id: `${todos.length + 1}`,
        title,
        completed: false
      };

      todos.push(newTodo);

      return newTodo;
    },
    toggleTodoCompleted: (_: unknown, args: { id: string }) => {
      const validationResult = ToggleTodoCompletedSchema.safeParse(args);

      if (!validationResult.success) {
        throw new Error(`Validation Error: ${validationResult.error.message}`);
      }

      const { id } = validationResult.data;

      const todo = todos.find((todo) => todo.id === id);

      if (!todo) throw new Error("Todo not found");

      todo.completed = !todo.completed;

      return todo;
    }
  }
};
