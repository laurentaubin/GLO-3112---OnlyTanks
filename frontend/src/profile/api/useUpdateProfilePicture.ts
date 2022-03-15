import { useEffect, useState } from "react";
import User from "../../main/domain/user/User";
import { useAxios } from "../../main/hooks/useAxios";
import UserAssembler from "./UserAssembler";
import UserResponse from "./UserResponse";

export const useUpdateProfilePicture = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [updatedUser, setUpdatedUser] = useState<User>();

  const updateProfilePicture = async (username: string, image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    await sendRequest({
      url: "/user/uploadProfilePicture",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  useEffect(() => {
    if (data?.data) {
      setUpdatedUser(UserAssembler.assembleToUser(data?.data as UserResponse));
    }
  }, [data?.data]);

  return { data, updateProfilePicture, updatedUser, state, error };
};
