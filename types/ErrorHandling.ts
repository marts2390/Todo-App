export type ValidationError = {
  field: string;
  message: string;
  code: string;
};

export type CustomGraphQLErrorExtensions = {
  code: string;
  validationErrors: ValidationError[];
};
