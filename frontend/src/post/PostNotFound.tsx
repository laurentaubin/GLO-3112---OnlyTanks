import { useRouter } from "next/router";

const PostNotFound = () => {
  const router = useRouter();

  const onGoToHomeClick = () => {
    router.push("/");
  };
  return (
    <div className="flex justify-center w-full mt-10">
      <div>
        <div className="font-bold">
          <div className="text-lg text-center">Sorry</div>
          <div className="text-center">Post is no longer available</div>
        </div>

        <div className="flex justify-center">
          <button className="mt-5 justify-center text-blue-primary hover:text-blue-500" onClick={onGoToHomeClick}>
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNotFound;
