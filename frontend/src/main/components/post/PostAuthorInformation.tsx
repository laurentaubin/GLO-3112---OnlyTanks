import Link from "next/link";

interface Props {
  profileImageUrl: string;
  username: string;
}

const PostAuthorInformation = ({ profileImageUrl, username }: Props) => {
  return (
    <Link href={`/${username}`} passHref>
      <a className="flex flex-row items-center">
        <img className="rounded-full w-12 h-12 hover:cursor-pointer" src={profileImageUrl} alt="" />
        <span className="font-bold hover:cursor-pointer ml-2">{username}</span>
      </a>
    </Link>
  );
};

export default PostAuthorInformation;
