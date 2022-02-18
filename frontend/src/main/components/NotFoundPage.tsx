import { useRouter } from "next/router";

const PostNotFound = () => {
  const router = useRouter();

  const onGoToHomeClick = () => {
    router.push("/");
  };
  return (
    <div className="flex justify-center w-full mt-10 h-screen">
      <div>
        <div className="font-bold">
          <div className="text-2xl text-center mb-2">Sorry</div>
          <div className="text-center mb-6">This page is not available</div>
          <div className="text-gray-500 text-center font-normal">
            The link you followed may be broken, or the page may have been removed.
          </div>
        </div>

        <div className="flex justify-center">
          <button className="mt-2 justify-center text-blue-primary hover:text-blue-500" onClick={onGoToHomeClick}>
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNotFound;
