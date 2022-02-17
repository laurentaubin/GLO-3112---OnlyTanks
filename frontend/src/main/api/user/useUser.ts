import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import UserAssembler from "../../../profile/api/UserAssembler";
import UserResponse from "../../../profile/api/UserResponse";

export const useUser = (username: string) => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    if (username) {
      const getByUsername = async () => {
        await sendRequest({ url: `/user/${username}`, method: "GET" });
      };

      getByUsername();
    }
  }, [username]);

  return { user: UserAssembler.assembleToUser(data?.data as UserResponse), state, error };
};
