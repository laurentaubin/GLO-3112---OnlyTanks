import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import CommentAssembler from "../../post/api/CommentAssembler";
import CommentsResponse from "../api/post/CommentsResponse";
import Comment from "../domain/Comment";

const usePostComments = (postId: string) => {
  const { data, sendRequest } = useAxios();
  const [comments, setComments] = useState<Comment[]>([]);

  const getPostComments = async () => {
    await sendRequest({ url: `/posts/${postId}/comments`, method: "GET" });
  };

  useEffect(() => {
    if (data?.data) {
      setComments(CommentAssembler.assembleToComments(data?.data as CommentsResponse));
    }
  }, [data?.data]);

  return { comments: comments, getPostComments };
};

export default usePostComments;
