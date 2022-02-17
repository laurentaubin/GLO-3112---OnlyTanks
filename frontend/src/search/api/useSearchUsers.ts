import { useAxios } from "../../main/hooks/useAxios";
import { useEffect } from "react";
import UserAssembler from "../../profile/api/UserAssembler";
import MultipleUsersResponse from "../../profile/api/MultipleUsersResponse";

export const useSearchUsers = () => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    const searchUsers = async () => {
      await sendRequest({ url: "search/users", method: "GET" });
    };
    searchUsers();
  }, []);

  return { searchReturnUsers: UserAssembler.assembleToUsers(data?.data as MultipleUsersResponse), state, error };
};
