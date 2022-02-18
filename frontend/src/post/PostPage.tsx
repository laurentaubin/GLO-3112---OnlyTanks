import { useEffect } from "react";
import { useRouter } from "next/router";
import usePost from "./api/usePost";
import PostPreview from "../main/components/post/PostPreview";
import { State } from "../main/hooks/useAxios";
import { BiArrowBack } from "react-icons/bi";
import useDeletePost from "./api/useDeletePost";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import NotFoundPage from "../main/components/NotFoundPage";

const PostPage = () => {
  const { deletePost } = useDeletePost();
  const router = useRouter();
  const { id } = router.query;
  const { post, getPost, state } = usePost();

  useEffect(() => {
    if (id) {
      getPost(id as string);
    }
  }, [id]);

  const onBack = () => {
    router.back();
  };

  const onDeletePost = async () => {
    await deletePost(post.id);
    onBack();
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
      {state === State.ERROR && <NotFoundPage />}
      {state === (State.IDLE || State.LOADING) && (
        <div className="flex justify-center text-blue-primary mt-10">
          <SpinnerIcon size={32} />
        </div>
      )}
      {state === State.SUCCESS && <PostPreview onDeletePostClick={onDeletePost} post={post} />}
    </>
  );
};

export default PostPage;
