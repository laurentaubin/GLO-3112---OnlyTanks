import { FcGoogle } from "react-icons/fc";

interface Props {
  onClick: () => Promise<void>;
  text: string;
}

export const GoogleButton = ({ onClick, text }: Props) => {
  return (
    <button type="button" className="my-2 border flex items-center px-2 h-[40px] rounded" onClick={onClick}>
      <FcGoogle className="w-6 h-6" />
      <div className="ml-6 font-semibold text-gray-500">{text}</div>
    </button>
  );
};
