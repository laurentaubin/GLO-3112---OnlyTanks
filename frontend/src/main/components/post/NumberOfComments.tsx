import { useRouter } from "next/router";

interface Props {
  numberOfComments: number;
  postId: string;
}

const NumberOfComments = ({ numberOfComments, postId }: Props) => {
  const router = useRouter();

  const onViewCommentsClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: postId } });
  };

  if (numberOfComments === 0) {
    return null;
  }

  return (
    <div className="flex flex-row hover:cursor-pointer mt-1 text-gray-500" onClick={onViewCommentsClick}>
      View {numberOfComments} {numberOfComments > 1 ? "comments" : "comment"}
    </div>
  );
};

export default NumberOfComments;
