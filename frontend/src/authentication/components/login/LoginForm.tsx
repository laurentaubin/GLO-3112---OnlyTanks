import * as React from "react";
import { useLogin } from "../../api/useLogin";
import { Form, Formik, useFormikContext } from "formik";
import { FormikField } from "../../../main/components/FormikField";

import { State } from "../../../main/hooks/useAxios";
import * as Yup from "yup";
import { useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { setErrors } from "../../utils/setErrors";
import { SubmitButton } from "../SubmitButton";
import AuthProvider from "../../domain/AuthProvider";

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

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        if (data?.data.error) {
          setErrors([{ param: "username", msg: "Invalid username" }], setFormErrors);
          break;
        }
        // TODO set session cookies
        router.push("/");
        break;

      case State.ERROR:
        if (error?.response?.status == 202) {
          setErrors([{ param: "username", msg: "Invalid username" }], setFormErrors);
          break;
        }
    }
  }, [state]);

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
