import { useAxios } from "../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import PostAssembler from "../../main/api/post/PostAssembler";
import Post from "../../main/domain/post/Post";

const useFeed = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (data) {
      setPosts(data?.data.map(PostAssembler.assemblePost));
    }
  }, [data]);

  const getFeed = async () => {
    await sendRequest({ url: "/feed", method: "GET" });
  };
  return { posts, state, getFeed, error };
};

export default useFeed;
