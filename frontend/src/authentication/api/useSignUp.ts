import User from "../../main/domain/user/User";
import { useAxios } from "../../main/hooks/useAxios";
import AuthProvider from "../domain/AuthProvider";

export const useSignUp = () => {
  const { data, sendRequest, state, error } = useAxios();

  const signUpUser = async (user: User, authProvider: AuthProvider, authToken: string) => {
    await sendRequest({ url: "/signup", method: "POST", data: { ...user, authProvider, authToken } });
  };

  return { data, state, signUpUser, error };
};
