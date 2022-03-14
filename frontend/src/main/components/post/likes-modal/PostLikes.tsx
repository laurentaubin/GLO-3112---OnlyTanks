import Link from "next/link";
import UserPreview from "../../../domain/user/UserPreview";

interface Props {
  userPreviews: UserPreview[];
}

const PostLikes = ({ userPreviews }: Props) => {
  return (
    <div className="relative max-h-80 overflow-auto pt-2 px-4">
      {userPreviews.map((userPreview) => {
        return (
          <div key={userPreview.username} className="flex flex-row items-center">
            <Link key={userPreview.username} href={`/${userPreview.username}`} passHref>
              <a className="flex flex-row items-center pb-3">
                <img className="rounded-full w-12 h-12 hover:cursor-pointer border border-gray-300" src={userPreview.imageUrl} alt="" />
                <span className="hover:cursor-pointer hover:underline font-bold text-sm pl-2">{userPreview.username}</span>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostLikes;
