import { useAxios } from "../../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import PostAssembler from "../../../main/api/post/PostAssembler";
import Post from "../../../main/domain/post/Post";

export const useSearchPostsByHashtags = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data?.data.map(PostAssembler.assemblePost));
    }
  }, [data]);

  const searchPostsByHashtags = async (hashtags: string[]) => {
    await sendRequest({
      url: `search/posts/hashtags?${hashtags.map((hashtag, idx) => `hashtags[${idx}]=${hashtag}`).join("&")}`,
      method: "GET"
    });
  };

  return { posts, state, searchPostsByHashtags, error };
};
