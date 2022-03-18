import User from "../../main/domain/user/User";
import { FormikErrors, FormikTouched } from "formik";

export const isFormInvalid = (formErrors: FormikErrors<User>, touched: FormikTouched<User>, initialValues: User) => {
  return Object.keys(formErrors).length > 0 || Object.keys(touched).length < Object.keys(initialValues).length;
};
