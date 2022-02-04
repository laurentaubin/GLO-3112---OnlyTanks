import { useAxios } from "../../main/hooks/useAxios";

export const useLogin = () => {
  const { data, sendRequest, state, error } = useAxios();

  const loginUser = (authProvider: string, token = "", username = "") => {
    sendRequest({ url: "/login", method: "POST", data: { authProvider: authProvider, token: token, username: username } });
  };

  return { data, state, loginUser, error };
};
