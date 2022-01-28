import { useAxios } from "./useAxios";

export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export const useSignUp = () => {
  const { data, sendRequest, state, error } = useAxios();

  const signUpUser = (user: User) => {
    sendRequest({ url: "/signup", method: "POST", data: user });
  };

  return { data, state, signUpUser, error };
};
