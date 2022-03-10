import { useAxios } from "./useAxios";

const usePostReaction = () => {
  const { sendRequest } = useAxios();

  const likePost = async (id: string) => {
    await sendRequest({ url: `/posts/${id}/like`, method: "POST" });
  };

  const unlikePost = async (id: string) => {
    await sendRequest({ url: `/posts/${id}/unlike`, method: "POST" });
  };

  return { likePost, unlikePost };
};

export default usePostReaction;
