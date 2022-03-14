import { useEffect, useState } from "react";
import User from "../../main/domain/user/User";
import { useAxios } from "../../main/hooks/useAxios";
import UserAssembler from "./UserAssembler";
import UserResponse from "./UserResponse";

const useUpdateUserInformation = () => {
  const { data, sendRequest, state, error, setError } = useAxios();
  const [updatedUser, setUpdatedUser] = useState<User>();

  const updateUserInformation = async (user: User) => {
    await sendRequest({ url: `/user/${user.username}`, method: "PUT", data: user });
  };

  const resetErrors = () => {
    setError(undefined);
  };

  useEffect(() => {
    if (data?.data) {
      setUpdatedUser(UserAssembler.assembleToUser(data?.data as UserResponse));
    }
  }, [data?.data]);

  return { updateUserInformation, updatedUser, state, error, resetErrors };
};

export default useUpdateUserInformation;
