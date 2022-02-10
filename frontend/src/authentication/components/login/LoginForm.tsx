import * as React from "react";
import { useEffect } from "react";
import { useLogin } from "../../api/useLogin";
import { Form, Formik, useFormikContext } from "formik";
import { FormikField } from "../../../main/components/FormikField";

import { State } from "../../../main/hooks/useAxios";
import * as Yup from "yup";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { setErrors } from "../../utils/setErrors";
import { SubmitButton } from "../SubmitButton";
import AuthProvider from "../../domain/AuthProvider";
import { useCookies } from "react-cookie";
import { constants } from "../../../constants/constants";

export interface LoginValues {
  username: string;
}

interface InternalLoginFormProps {
  data: AxiosResponse | undefined;
  state: State;
  error: AxiosError | undefined;
}

const InternalLoginForm = ({ data, state, error }: InternalLoginFormProps) => {
  const { errors: formErrors, touched, setErrors: setFormErrors, initialValues } = useFormikContext<LoginValues>();

  const router = useRouter();

  const [, setCookie] = useCookies([constants.SESSION_TOKEN_COOKIE, constants.AUTH_PROVIDER_COOKIE]);

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        if (data?.data.error) {
          setErrors([{ param: "username", msg: "Invalid username" }], setFormErrors);
          break;
        }
        // TODO set session cookies
        setCookies(data?.data.token);
        router.push("/");
        break;

      case State.ERROR:
        if (error?.response?.status == 202) {
          setErrors([{ param: "username", msg: "Invalid username" }], setFormErrors);
          break;
        }
    }
  }, [state]);

  const setCookies = (token: string) => {
    setCookie(constants.AUTH_PROVIDER_COOKIE, AuthProvider.LOCAL, { maxAge: constants.SESSION_TOKEN_TTL });
    setCookie(constants.SESSION_TOKEN_COOKIE, token, { maxAge: constants.SESSION_TOKEN_TTL });
  };

  return (
    <Form className="text-center align-middle justify-center">
      <FormikField name="username" placeholder="Username" isError={!!(formErrors.username && touched.username)} />
      <SubmitButton label="Log In" formErrors={formErrors} touched={touched} initialValues={initialValues} state={state} />
    </Form>
  );
};

export const LoginForm = () => {
  const { data, state, loginUser, error } = useLogin();

  const initialValues: LoginValues = {
    username: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(" ")
  });

  const onSubmit = (values: LoginValues) => {
    loginUser(AuthProvider.LOCAL, undefined, values.username);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <InternalLoginForm data={data} state={state} error={error} />
      </Formik>
    </>
  );
};
