import PostAssembler from "../api/post/PostAssembler";
import { useAxios } from "./useAxios";
import PostResponse from "../api/post/PostResponse";
import { useEffect, useState } from "react";
import Post from "../domain/Post";

const useUpdatePost = () => {
  const { data, sendRequest } = useAxios();
  const [updatedPost, setUpdatedPost] = useState<Post>();

  const updatePost = async (id: string, caption: string, hashtags: string[]) => {
    await sendRequest({ url: `/posts/${id}`, method: "PUT", data: { caption: caption, hashtags: hashtags } });
  };

  useEffect(() => {
    if (data?.data) {
      setUpdatedPost(PostAssembler.assemblePost(data?.data as PostResponse));
    }
  }, [data?.data]);

  return { updatePost, updatedPost };
};

export default useUpdatePost;
