import { z } from "zod";

export const AddTodoSchema = z.object({
  title: z.string().min(1, "Title cannot be empty")
});

export const ToggleTodoCompletedSchema = z.object({
  id: z.string().uuid("Invalid ID format")
});
