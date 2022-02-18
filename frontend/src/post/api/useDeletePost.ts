import { useAxios } from "../../main/hooks/useAxios";

const useDeletePost = () => {
  const { sendRequest, state, error } = useAxios();

  const deletePost = async (id: string) => {
    return await sendRequest({ url: `/posts/${id}`, method: "DELETE" });
  };

  return { deletePost, state, error };
};

export default useDeletePost;
