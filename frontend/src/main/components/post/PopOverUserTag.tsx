import Link from "next/link";
import UserTag from "../../domain/UserTag";
import { TiDelete } from "react-icons/ti";

interface Props {
  tag: UserTag;
  onDelete?: (username: string) => void;
}

export const PopOverUserTag = ({ tag, onDelete }: Props) => {
  return (
    <div className={["opacity-85", !onDelete ? "hover:opacity-75" : ""].join(" ")}>
      <div
        className={"absolute w-3 h-3 bg-black -rotate-45"}
        style={{ left: `${tag.position[0] + 1}%`, top: `${tag.position[1] - 0.5}%` }}
      />
      <div
        className={"bg-black absolute py-1 px-2 rounded-md select-none flex"}
        style={{ left: `${tag.position[0]}%`, top: `${tag.position[1]}%` }}
      >
        {onDelete ? (
          <span className="text-white">{tag.username}</span>
        ) : (
          <Link href={`/${tag.username}`} passHref>
            <span className="text-white">{tag.username}</span>
          </Link>
        )}
        {onDelete && (
          <button
            type="button"
            className="text-white my-auto ml-1"
            onClick={() => {
              onDelete(tag.username);
            }}
          >
            <TiDelete size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
