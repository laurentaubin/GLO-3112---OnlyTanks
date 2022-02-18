import { useRouter } from "next/router";

interface Props {
  id: string;
  imageUrl: string;
}

const ImagePost = ({ id, imageUrl }: Props) => {
  const router = useRouter();

  const onPostClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: id } });
  };
  return (
    <div onClick={onPostClick} className="cursor-pointer">
      <img className="object-cover" src={imageUrl} style={{ height: 200 }} alt="display image" />
    </div>
  );
};

export default ImagePost;
