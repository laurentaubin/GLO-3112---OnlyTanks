import { LoginValues } from "../components/login/LoginForm";
import User from "../../main/domain/user/User";
import { FormikErrors, FormikTouched } from "formik";

export const isFormInvalid = (
  formErrors: FormikErrors<LoginValues | User>,
  touched: FormikTouched<LoginValues | User>,
  initialValues: LoginValues | User
) => {
  return Object.keys(formErrors).length > 0 || Object.keys(touched).length < Object.keys(initialValues).length;
};
