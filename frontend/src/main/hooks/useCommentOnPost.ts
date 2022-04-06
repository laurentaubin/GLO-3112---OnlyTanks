import { PostCommentRequest } from "../../post/api/PostCommentRequest";
import { useAxios } from "./useAxios";

const useCommentOnPost = () => {
  const { sendRequest, state } = useAxios();

  const commentPost = async (id: string, commentRequest: PostCommentRequest) => {
    await sendRequest({ url: `/posts/${id}/comment`, method: "POST", data: commentRequest });
  };

  return { commentPost, state };
};

export default useCommentOnPost;
