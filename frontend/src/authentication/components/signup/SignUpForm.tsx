import { AxiosError } from "axios";
import { Form, Formik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { State } from "../../../main/hooks/useAxios";
import { useSignUp } from "../../api/useSignUp";
import { FormikField } from "../../../main/components/FormikField";
import User from "../../../main/domain/User";
import { setErrors } from "../../utils/setErrors";
import { SubmitButton } from "../SubmitButton";
import {FormikPhoneNumberField} from "../../../main/components/FormikPhoneNumberField";

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
        setErrors(error?.response?.data.errors, setFormErrors);
        break;
    }
  }, [router, state]);

  return (
    <Form className="text-center align-middle justify-center">
      <FormikField name="username" placeholder="Username" isError={!!(formErrors.username && touched.username)} />

      <FormikField name="firstName" placeholder="First name" isError={!!(formErrors.firstName && touched.firstName)} />

      <FormikField name="lastName" placeholder="Last name" isError={!!(formErrors.lastName && touched.lastName)} />

      <FormikField name="email" placeholder="Email" isError={!!(formErrors.email && touched.email)} isDisabled={!!initialValues.email} />

      <FormikPhoneNumberField name="phoneNumber" placeholder="Phone number" isError={!!(formErrors.phoneNumber && touched.phoneNumber)} />

      <SubmitButton label={"Submit"} formErrors={formErrors} touched={touched} initialValues={initialValues} state={state} />
    </Form>
  );
};

export const SignUpForm = () => {
  const { state, signUpUser, error } = useSignUp();
  const router = useRouter();
  const { firstName, lastName, email } = router.query;

  const initialValues: User = {
    username: "",
    firstName: (firstName as string) || "",
    lastName: (lastName as string) || "",
    email: (email as string) || "",
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
    const normalizedInputs = normalizeInputs(values);
    signUpUser(normalizedInputs);
  };

  const normalizeInputs = (values: User): User => {
    return {
      ...values,
      phoneNumber: normalizePhoneNumberInput(values.phoneNumber)
    };
  };

  const normalizePhoneNumberInput = (phoneNumber: string): string => {
    return phoneNumber.replace(/[ ()+-]/g, () => "");
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
