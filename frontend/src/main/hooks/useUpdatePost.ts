import PostAssembler from "../api/post/PostAssembler";
import { useAxios } from "./useAxios";
import PostResponse from "../api/post/PostResponse";
import { useEffect, useState } from "react";
import Post from "../domain/post/Post";
import UserTag from "../domain/UserTag";

const useUpdatePost = () => {
  const { data, sendRequest } = useAxios();
  const [updatedPost, setUpdatedPost] = useState<Post>();

  const updatePost = async (id: string, caption: string, hashtags: string[], userTags: UserTag[]) => {
    const formattedUserTags: UserTag[] = userTags.map((tag) => ({
      username: tag.username,
      position: tag.position.map((post) => post / 100)
    }));

    await sendRequest({ url: `/posts/${id}`, method: "PUT", data: { caption, hashtags, userTags: formattedUserTags } });
  };

  useEffect(() => {
    if (data?.data) {
      setUpdatedPost(PostAssembler.assemblePost(data?.data as PostResponse));
    }
  }, [data?.data]);

  return { updatePost, updatedPost };
};

export default useUpdatePost;
