import { useAxios } from "../../main/hooks/useAxios";

export const useUpdateProfilePicture = () => {
  const { data, sendRequest, state, error } = useAxios();

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

  return { data, updateProfilePicture, state, error };
};
