import { ApolloError } from "@apollo/client";
import { isValidationErrorExtensions } from "./type-guards";

export const validateErrors = (err: ApolloError): string => {
  const errors = err.graphQLErrors.reduce((arr: string[], item) => {
    console.log(item);

    if (isValidationErrorExtensions(item.extensions)) {
      item.extensions.validationErrors.forEach((validationError) => {
        console.log(validationError.message);

        arr.push(validationError.message);
      });
    }

    return arr;
  }, []);

  return errors.join(", ");
};
