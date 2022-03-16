import { useAxios } from "../../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import UserAssembler from "../../../profile/api/UserAssembler";
import MultipleUsersResponse from "../../../profile/api/MultipleUsersResponse";
import User from "../../../main/domain/user/User";

export const useSearchUsers = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(UserAssembler.assembleToUsers(data?.data as MultipleUsersResponse));
    }
  }, [data]);

  const searchUsers = async (partialUsername: string) => {
    await sendRequest({ url: "/users", method: "GET", params: { partialUsername } });
  };

  return { users, searchUsers, state, error };
};
