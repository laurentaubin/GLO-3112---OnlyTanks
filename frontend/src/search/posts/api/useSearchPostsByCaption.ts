import { useAxios } from "../../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import PostAssembler from "../../../main/api/post/PostAssembler";
import Post from "../../../main/domain/post/Post";

export const useSearchPostsByCaption = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data?.data.map(PostAssembler.assemblePost));
    }
  }, [data]);

  const searchPosts = async (caption: string) => {
    await sendRequest({ url: "/search/posts", method: "GET", params: { caption } });
  };

  return { posts, state, searchPosts, error };
};
