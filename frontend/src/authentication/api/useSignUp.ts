import User from "../../main/domain/User";
import { useAxios } from "../../main/hooks/useAxios";

export const useSignUp = () => {
  const { data, sendRequest, state, error } = useAxios();

  const signUpUser = async (user: User) => {
    await sendRequest({ url: "/signup", method: "POST", data: user });
  };

  return { data, state, signUpUser, error };
};
