import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import CommentAssembler from "../../post/api/CommentAssembler";
import CommentsWithAuthorPreviewResponse from "../api/comment/CommentsWithAuthorPreview";
import CommentWithAuthorPreview from "../domain/CommentWithAuthorPreview";

const usePostComments = (postId: string) => {
  const { data, sendRequest } = useAxios();
  const [comments, setComments] = useState<CommentWithAuthorPreview[]>([]);

  const getPostComments = async () => {
    await sendRequest({ url: `/posts/${postId}/comments`, method: "GET" });
  };

  useEffect(() => {
    if (data?.data) {
      setComments(CommentAssembler.assembleToCommentsWithAuthorPreview(data?.data as CommentsWithAuthorPreviewResponse));
    }
  }, [data?.data]);

  return { comments: comments, getPostComments };
};

export default usePostComments;
