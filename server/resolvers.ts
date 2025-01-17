import { Todo } from "@/types/Todo";
import { mockTodos } from "../data/todos";
import { AddTodoSchema, IdSchema } from "./validation";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";
import { ZodIssue } from "zod";
import dayjs from "dayjs";
import { TodoStack } from "@/types/TodoStack";

const todos: Todo[] = mockTodos;

const formatErrors = (errArray?: ZodIssue[], customErr?: string): void => {
  const errors = errArray?.map((issue) => ({
    field: issue.path[0],
    message: issue.message,
    code: issue.code
  }));

  throw new GraphQLError("Validation Error", {
    extensions: {
      code: "BAD_USER_INPUT",
      validationErrors: errors || [{ message: customErr }]
    }
  });
};

export const resolvers = {
  Query: {
    todos: () => {
      const formatToDate = todos
        .reduce((acc: TodoStack[], todo) => {
          const date = dayjs(todo.date);
          const groupExists = acc.find((group) =>
            dayjs(group.date).isSame(date, "day")
          );

          if (groupExists) {
            groupExists.items.push(todo);
          } else {
            acc.push({ date: date.toISOString(), items: [todo] });
          }

          return acc;
        }, [])
        .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

      return formatToDate;
    }
  },
  Mutation: {
    addTodo: (_: unknown, args: { title: string; content: string }) => {
      const validationResult = AddTodoSchema.safeParse(args);

      if (!validationResult.success) {
        formatErrors(validationResult.error.issues);

        return;
      }

      const { title, content } = validationResult.data;

      const newTodo: Todo = {
        id: uuidv4(),
        date: dayjs().toISOString(),
        title,
        content,
        completed: false
      };

      todos.push(newTodo);

      return newTodo;
    },
    deleteTodo: (_: unknown, args: { id: string }) => {
      const validationResult = IdSchema.safeParse(args);

      if (!validationResult.success) {
        formatErrors(validationResult.error.issues);

        return;
      }

      const { id } = args;

      const todoIndex = todos.findIndex((item) => item.id === id);

      if (todoIndex === -1) {
        formatErrors(undefined, `No todo found with id: ${id}`);
      }

      todos.splice(todoIndex, 1);

      return true;
    },
    toggleTodoCompleted: (_: unknown, args: { id: string }) => {
      const validationResult = IdSchema.safeParse(args);

      if (!validationResult.success) {
        throw new Error(validationResult.error.message);
      }

      const { id } = validationResult.data;

      const todo = todos.find((todo) => todo.id === id);

      if (!todo) throw new Error("Todo not found");

      todo.completed = !todo.completed;

      return todo;
    }
  }
};
