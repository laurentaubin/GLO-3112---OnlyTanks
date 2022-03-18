import { useAxios } from "../../main/hooks/useAxios";
import { useEffect } from "react";
import PostAssembler from "../../main/api/post/PostAssembler";

export const useAuthorPosts = (username: string) => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    if (username) {
      const getAuthorPosts = async () => {
        await sendRequest({ url: "/posts", method: "GET", params: { author: username } });
      };

      getAuthorPosts();
    }
  }, [username]);

  return { posts: data?.data.map(PostAssembler.assemblePost), state, error };
};
