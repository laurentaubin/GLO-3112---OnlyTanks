import { useAxios } from "../../main/hooks/useAxios";

export const useDeleteAccount = (username?: string) => {
  const { sendRequest } = useAxios();

  const deleteUserAccount = async () => {
    if (username) {
      await sendRequest({ url: `/${username}`, method: "DELETE" });
    }
  };

  return { deleteUserAccount };
};
