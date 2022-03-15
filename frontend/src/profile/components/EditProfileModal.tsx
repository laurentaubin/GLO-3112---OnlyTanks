import { useEffect, useRef } from "react";
import useUpdateUserInformation from "../api/useUpdateUserInformation";
import { Form, Formik, useFormikContext } from "formik";
import User from "../../main/domain/user/User";
import { State } from "../../main/hooks/useAxios";
import { AxiosError } from "axios";
import { formatInputs, normalizeInputs } from "../../main/utils/inputUtils";
import * as Yup from "yup";
import { FormikField } from "../../main/components/FormikField";
import { FormikPhoneNumberField } from "../../main/components/FormikPhoneNumberField";
import { setErrors } from "../../authentication/utils/setErrors";
import { SubmitButton } from "./SubmitButton";
import Modal from "../../main/components/Modal";

interface InternalUserInformationProps {
  updatedUser: User | undefined;
  state: State;
  error: AxiosError | undefined;
  onCloseModal: () => void;
}

const InternalUserInformation = ({ updatedUser, state, error, onCloseModal }: InternalUserInformationProps) => {
  const { errors: formErrors, resetForm, touched, setErrors: setFormErrors } = useFormikContext<User>();

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        if (updatedUser) {
          resetForm({ values: formatInputs(updatedUser) });
          onCloseModal();
        }
        break;

      case State.ERROR:
        setErrors(error?.response?.data.errors, setFormErrors);
        break;
    }
  }, [state]);

  return (
    <Form className="text-center align-middle justify-center">
      <FormikField name="firstName" placeholder="First name" isError={!!(formErrors.firstName && touched.firstName)} />

      <FormikField name="lastName" placeholder="Last name" isError={!!(formErrors.lastName && touched.lastName)} />

      <FormikField name="email" placeholder="Email" isError={!!(formErrors.email && touched.email)} />

      <FormikPhoneNumberField name="phoneNumber" placeholder="Phone number" isError={!!(formErrors.phoneNumber && touched.phoneNumber)} />

      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
        <SubmitButton label={"Save"} formErrors={formErrors} state={state} />

        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onCloseModal}
          ref={useRef(null)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

interface Props {
  user: User;
  open: boolean;
  setOpen: (open: boolean) => void;
  onUserUpdated: (user: User) => void;
}

const EditProfileModal = ({ user, open, setOpen, onUserUpdated }: Props) => {
  const { updateUserInformation, updatedUser, state, error } = useUpdateUserInformation();

  useEffect(() => {
    if (updatedUser) {
      onUserUpdated(updatedUser);
    }
  }, [onUserUpdated, updatedUser]);

  const initialValues: User = formatInputs(user);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(" "),
    lastName: Yup.string().required(" "),
    email: Yup.string().required(" "),
    phoneNumber: Yup.string().required(" ")
  });

  const onCloseModal = () => {
    setOpen(false);
  };

  const onSubmit = async (values: User) => {
    const normalizedInputs = normalizeInputs(values);
    await updateUserInformation(normalizedInputs);
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Edit profile">
      <div className="mt-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          initialStatus={{}}
        >
          <InternalUserInformation updatedUser={updatedUser} state={state} error={error} onCloseModal={onCloseModal} />
        </Formik>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
