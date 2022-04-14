import { useAxios } from "../../main/hooks/useAxios";

export const useCreateGoogleAuthLink = () => {
  const { data, sendRequest } = useAxios();

  const createGoogleAuthLink = async () => {
    await sendRequest({
      url: "/create-auth-link",
      method: "POST"
    });
  };

  return { authLink: data?.data.url, createGoogleAuthLink };
};
