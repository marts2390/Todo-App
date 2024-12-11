import { CustomGraphQLErrorExtensions } from "@/types/ErrorHandling";

export const isValidationErrorExtensions = (
  extensions: unknown
): extensions is CustomGraphQLErrorExtensions =>
  typeof extensions === "object" &&
  extensions !== null &&
  "validationErrors" in extensions &&
  Array.isArray((extensions as CustomGraphQLErrorExtensions).validationErrors);
