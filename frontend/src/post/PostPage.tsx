import { useEffect } from "react";
import { useRouter } from "next/router";
import usePost from "./api/usePost";
import PostPreview from "../main/components/post/PostPreview";
import { State } from "../main/hooks/useAxios";
import PostNotFound from "./PostNotFound";
import { BiArrowBack } from "react-icons/bi";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, getPost, state } = usePost();

  useEffect(() => {
    getPost(id as string);
  }, [id]);

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <header className="flex align-middle py-2 border border-gray-200 pl-2 text-gray-500 font-medium">
        <div className="flex cursor-pointer" onClick={onBack}>
          <div className="flex items-center hover:text-blue-primary">
            <BiArrowBack size={20} className="flex" />
          </div>
          <span className="my-auto text-lg ml-2"> BACK </span>
        </div>
      </header>
      {state === State.SUCCESS ? <PostPreview post={post} /> : <PostNotFound />}
    </>
  );
};

export default PostPage;
