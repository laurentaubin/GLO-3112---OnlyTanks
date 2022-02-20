import { useAxios } from "../../main/hooks/useAxios";
import { PostImageContent } from "./PostImageRequest";

export const useCreatePost = () => {
  const { data, sendRequest, state, error } = useAxios();

  const createPost = async (post: PostImageContent) => {
    const userTags = post.userTags.map((tag) => ({ username: tag.username, position: tag.position.map((pos) => pos / 100) }));

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("caption", post.caption);
    formData.append("hashtags", JSON.stringify(post.hashtags));
    formData.append("userTags", JSON.stringify(userTags));
    formData.append("author", post.author);
    await sendRequest({ url: "/posts", method: "POST", data: formData, headers: { "Content-Type": "multipart/form-data" } });
  };

  return { data, state, createPost, error };
};
