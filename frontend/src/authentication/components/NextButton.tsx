import { isFormInvalid } from "../utils/isFormInvalid";
import { State } from "../../main/hooks/useAxios";
import { SpinnerIcon } from "../../main/components/SpinnerIcon";
import * as React from "react";
import User from "../../main/domain/user/User";
import { FormikErrors, FormikTouched } from "formik";

interface Props {
  label: string;
  formErrors: FormikErrors<User>;
  touched: FormikTouched<User>;
  initialValues: User;
  state: State;
}

export const NextButton = ({ label, formErrors, touched, initialValues, state }: Props) => {
  return (
    <button
      className={
        "text-white rounded py-2 mt-2 w-full " + (isFormInvalid(formErrors, touched, initialValues) ? "bg-gray-light" : "bg-blue-primary")
      }
      type="submit"
      disabled={isFormInvalid(formErrors, touched, initialValues)}
    >
      <span className={state === State.LOADING ? "ml-4" : ""}>{label}</span>
      <span className="relative float-right mt-1 mr-4">{state === State.LOADING && <SpinnerIcon size={20} />}</span>
    </button>
  );
};
