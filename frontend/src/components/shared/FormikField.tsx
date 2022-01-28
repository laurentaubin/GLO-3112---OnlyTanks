import { ErrorMessage, Field, useField } from "formik";
import React, { useState } from "react";
import { User } from "../../hooks/useSignUp";

interface Props {
  name: string;
  placeholder: string;
  isError?: boolean;
}

export const FormikField = ({ name, placeholder, isError }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const [field, _, { setTouched }] = useField<User>(name);

  return (
    <>
      <div className={["relative border rounded mb-2 bg-slate-100", isError ? "border-red-500" : ""].join(" ")}>
        <Field
          className={[
            "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
            isActive ? "pt-6" : ""
          ].join(" ")}
          id={name}
          name={name}
          onFocus={() => setIsActive(true)}
          onBlur={() => {
            setTouched(true, true);
            setIsActive(!!field.value);
          }}
        />
        <label
          className={[
            "absolute top-0 left-0 flex items-center text-opacity-50 p-2 transition-all duration-200 ease-in-out text-gray-600",
            isActive ? "text-xs" : "text-sm"
          ].join(" ")}
          htmlFor={name}
        >
          <p>{placeholder}</p>
        </label>
      </div>

      <ErrorMessage name={name}>{(msg) => <div className="text-red-700 text-xs mb-1">{msg}</div>}</ErrorMessage>
    </>
  );
};
