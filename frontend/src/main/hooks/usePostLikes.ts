import { useAxios } from "./useAxios";
import { useEffect } from "react";
import UserAssembler from "../../profile/api/UserAssembler";
import UserPreviewsResponse from "../api/user/UserPreviewsResponse";

const usePostLikes = (postId: string) => {
  const { data, state, sendRequest } = useAxios();

  useEffect(() => {
    const getPostLikes = async (id: string) => {
      await sendRequest({ url: `/posts/${id}/likes`, method: "GET", data: {} });
    };

    getPostLikes(postId);
  }, [postId]);

  return { state, postLikes: UserAssembler.assembleToUserPreviews(data?.data as UserPreviewsResponse) };
};

export default usePostLikes;
