import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useUpdateUserInformation from "../api/useUpdateUserInformation";
import { Form, Formik, useFormikContext } from "formik";
import User from "../../main/domain/User";
import { State } from "../../main/hooks/useAxios";
import { AxiosError } from "axios";
import { formatInputs, normalizeInputs } from "../../main/utils/inputUtils";
import * as Yup from "yup";
import { FormikField } from "../../main/components/FormikField";
import { FormikPhoneNumberField } from "../../main/components/FormikPhoneNumberField";
import { setErrors } from "../../authentication/utils/setErrors";
import { SubmitButton } from "./SubmitButton";

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

      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
  const cancelButtonRef = useRef(null);
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onCloseModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/*Centers the modal*/}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0">
                    <Dialog.Title as="h1" className="text-2xl leading-6 font-medium text-gray">
                      Edit profile
                    </Dialog.Title>
                  </div>
                </div>
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
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditProfileModal;
