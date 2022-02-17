import { useEffect } from "react";
import { useRouter } from "next/router";
import usePost from "./api/usePost";
import PostPreview from "../main/components/post/PostPreview";
import { State } from "../main/hooks/useAxios";
import PostNotFound from "./PostNotFound";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, getPost, state } = usePost();

  useEffect(() => {
    getPost(id as string);
  }, [id]);

  return <>{state === State.SUCCESS ? <PostPreview post={post} /> : <PostNotFound />}</>;
};

export default PostPage;
