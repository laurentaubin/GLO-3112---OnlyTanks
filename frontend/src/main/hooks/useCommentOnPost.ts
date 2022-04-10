import { useEffect, useState } from "react";
import { PostCommentRequest } from "../../post/api/PostCommentRequest";
import PostAssembler from "../api/post/PostAssembler";
import PostResponse from "../api/post/PostResponse";
import Post from "../domain/post/Post";
import { useAxios } from "./useAxios";

const useCommentOnPost = () => {
  const { sendRequest, data, state } = useAxios();
  const [updatedPost, setUpdatedPost] = useState<Post>();

  const commentPost = async (id: string, commentRequest: PostCommentRequest) => {
    await sendRequest({ url: `/posts/${id}/comment`, method: "POST", data: commentRequest });
  };

  useEffect(() => {
    if (data?.data) {
      setUpdatedPost(PostAssembler.assemblePost(data?.data as PostResponse));
    }
  }, [data?.data]);

  return { commentPost, updatedPost, state };
};

export default useCommentOnPost;
