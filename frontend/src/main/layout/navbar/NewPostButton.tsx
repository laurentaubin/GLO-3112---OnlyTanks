import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export const NewPostButton = () => {
  return (
    <Link href="/create" passHref>
      <div className="mt-2">
        <button className="ml-2 w-12 h-12 rounded-full lg:w-full bg-blue-primary text-white hover:bg-blue-secondary">
          <span className="relative float-left ml-2">{<BiPlus size={32} />}</span>
          <span className="hidden lg:block pt-1">New Post</span>
        </button>
      </div>
    </Link>
  );
};
