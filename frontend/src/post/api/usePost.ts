import { useAxios } from "../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import Post from "../../main/domain/post/Post";
import PostAssembler from "../../main/api/post/PostAssembler";

const usePost = () => {
  const { data, sendRequest, state, error } = useAxios();
  const [post, setPost] = useState<Post>({} as Post);

  useEffect(() => {
    if (data) {
      setPost(PostAssembler.assemblePost(data.data));
    }
  }, [data]);

  const getPost = async (id: string) => {
    return await sendRequest({ url: `/posts/${id}`, method: "GET" });
  };

  return { post, getPost, state, error };
};

export default usePost;
