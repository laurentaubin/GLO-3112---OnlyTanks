import { BiPlus } from "react-icons/bi";

export const NewPostButton = () => {
  return (
    <div className="mt-2">
      <button className="ml-2 w-12 h-12 rounded-full lg:w-full bg-blue-400 text-white hover:bg-blue-500">
        <span className="relative float-left ml-2">{<BiPlus size={32} />}</span>
        <span className="hidden lg:block pt-1">New Post</span>
      </button>
    </div>
  );
};