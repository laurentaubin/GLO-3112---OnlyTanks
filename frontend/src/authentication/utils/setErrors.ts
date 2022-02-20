export const setErrors = (errors: { param: string; msg: string }[], setFormErrors: (newErrors: { [key: string]: string }) => void) => {
  const newErrors: { [key: string]: string } = {};
  errors?.map((error) => {
    newErrors[error.param] = error.msg;
  });

  setFormErrors(newErrors);
};
