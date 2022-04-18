import { useRouter } from "next/router";

interface Props {
  id: string;
  imageUrl: string;
}

const AuthorPostItem = ({ id, imageUrl }: Props) => {
  const router = useRouter();

  const onPostClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: id } });
  };
  return (
    <div onClick={onPostClick} className="cursor-pointer">
      <img className="object-cover min-h-full" src={imageUrl} alt="display image" />
    </div>
  );
};

export default AuthorPostItem;
