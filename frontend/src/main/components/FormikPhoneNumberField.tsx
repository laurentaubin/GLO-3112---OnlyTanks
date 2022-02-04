import { useField } from "formik";
import React, { ChangeEvent, useState } from "react";
import { FormikField } from "./FormikField";

interface Props {
  name: string;
  placeholder: string;
  isError?: boolean;
}

export const FormikPhoneNumberField = ({ name, placeholder, isError }: Props) => {
  const [previousValue, setPreviousValue] = useState("");

  const [{ onChange }, _, { setValue }] = useField<string>(name);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const sanitizedPhoneNumber = sanitizePhoneNumber(event.target.value, previousValue);
    setValue(sanitizedPhoneNumber);
    setPreviousValue(sanitizedPhoneNumber);
  };

  const sanitizePhoneNumber = (value: string, previousValue: string): string => {
    if (!value) return value;

    const currentValue = value.replace(/[^\d]/g, "");

    if (previousValue && value.length < previousValue.length) return value;

    const currentValueLength = currentValue.length;

    if (currentValueLength < 4) return currentValue;

    if (currentValueLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  };

  return <FormikField name={name} placeholder={placeholder} isError={isError} onChange={handleInputChange} />;
};
