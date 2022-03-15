import { State } from "../../main/hooks/useAxios";
import { SpinnerIcon } from "../../main/components/SpinnerIcon";
import * as React from "react";
import User from "../../main/domain/user/User";
import { FormikErrors } from "formik";
import { isFormInvalid } from "../utils/isFormInvalid";

interface Props {
  label: string;
  formErrors: FormikErrors<User>;
  state: State;
}

export const SubmitButton = ({ label, formErrors, state }: Props) => {
  return (
    <div>
      <button
        className={
          "w-full inline-flex justify-center content-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-primary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray sm:ml-3 sm:w-auto sm:text-sm " +
          (isFormInvalid(formErrors) ? "bg-blue-300" : "bg-blue-primary hover:bg-blue-secondary")
        }
        type="submit"
        disabled={isFormInvalid(formErrors)}
      >
        <span className={state === State.LOADING ? "ml-4" : ""}>{label}</span>
        <span className="relative float-right mt-1">{state === State.LOADING && <SpinnerIcon size={12} />}</span>
      </button>
    </div>
  );
};
