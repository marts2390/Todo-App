import { z } from "zod";

export const AddTodoSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().min(1, "Content cannot be empty")
});

export const IdSchema = z.object({
  id: z.string().uuid("Invalid ID format")
});
