import { AxiosError } from "axios";
import { Form, Formik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { State } from "../main/hooks/useAxios";
import { useSignUp } from "./api/useSignUp";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import { FormikField } from "../main/components/FormikField";
import User from "../main/domain/User";

interface InternalSignUpFormProps {
  state: State;
  error: AxiosError | undefined;
}

const InternalSignUpForm = ({ state, error }: InternalSignUpFormProps) => {
  const { errors: formErrors, touched, setErrors: setFormErrors, initialValues } = useFormikContext<User>();

  const router = useRouter();

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        // TODO set session cookies
        router.push("/");
        break;

      case State.ERROR:
        setErrors(error?.response?.data.errors);
        break;
    }
  }, [router, state]);

  const setErrors = (errors: any) => {
    const newErrors: any = {};
    errors.map((error: any) => {
      newErrors[error.param] = error.msg;
    });

    setFormErrors(newErrors);
  };

  const isFormInvalid = () => {
    return Object.keys(formErrors).length > 0 || Object.keys(touched).length < Object.keys(initialValues).length;
  };

  return (
    <Form className="text-center align-middle justify-center">
      <FormikField name="username" placeholder="Username" isError={!!(formErrors.username && touched.username)} />

      <FormikField name="firstName" placeholder="First name" isError={!!(formErrors.firstName && touched.firstName)} />

      <FormikField name="lastName" placeholder="Last name" isError={!!(formErrors.lastName && touched.lastName)} />

      <FormikField name="email" placeholder="Email" isError={!!(formErrors.email && touched.email)} />

      <FormikField name="phoneNumber" placeholder="Phone number" isError={!!(formErrors.phoneNumber && touched.phoneNumber)} />

      <button
        className={"text-white rounded py-2 mt-2 w-full " + (isFormInvalid() ? "bg-blue-200" : "bg-blue-400")}
        type="submit"
        disabled={isFormInvalid()}
      >
        <span className={state === State.LOADING ? "ml-4" : ""}>Submit</span>
        <span className="relative float-right mt-1 mr-4">{State.LOADING && <SpinnerIcon size={20} />}</span>
      </button>
    </Form>
  );
};

export const SignUpForm = () => {
  const { state, signUpUser, error } = useSignUp();

  const initialValues: User = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(" "),
    firstName: Yup.string().required(" "),
    lastName: Yup.string().required(" "),
    email: Yup.string().required(" "),
    phoneNumber: Yup.string().required(" ")
  });

  const onSubmit = (values: User) => {
    signUpUser(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        initialStatus={{}}
      >
        <InternalSignUpForm state={state} error={error} />
      </Formik>
    </div>
  );
};
