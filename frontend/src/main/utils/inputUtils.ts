import User from "../domain/user/User";

export const formatInputs = (values: User): User => {
  return {
    ...values,
    phoneNumber: formatPhoneNumber(values.phoneNumber)
  };
};

export const normalizeInputs = (values: User): User => {
  return {
    ...values,
    phoneNumber: normalizePhoneNumberInput(values.phoneNumber)
  };
};

const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber?.length == 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return phoneNumber;
};

const normalizePhoneNumberInput = (phoneNumber: string): string => {
  return phoneNumber.replace(/[ ()+-]/g, () => "");
};
