import User from "../../main/domain/user/User";
import { FormikErrors } from "formik";

export const isFormInvalid = (formErrors: FormikErrors<User>): boolean => {
  return Object.keys(formErrors).length > 0;
};
