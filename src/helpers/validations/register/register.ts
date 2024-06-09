import IRegister from "@/interfaces/Register";

import dataExistence from "./dataExistence";
import email from "./email";
import name from "./name";
import password from "./password";
import phone from "./phone";

const validations = (values:IRegister): Record<string,string> => {
  let errors: Record<string,string> = {};

  const dataExistenceErrors = dataExistence(values);
  const nameErrors = name(values);
  const emailErrors = email(values);
  const passwordErrors = password(values)
  const phoneErrors = phone(values)

  errors = {
    ...errors,
    ...dataExistenceErrors,
    ...nameErrors,
    ...emailErrors,
    ...passwordErrors,
    ...phoneErrors
  };
  return errors;
};

export default validations;