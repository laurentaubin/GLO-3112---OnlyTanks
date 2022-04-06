import { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

interface Props {
  postComment: (comment: string) => void;
  placeholder: string;
}

export const CommentInput = ({ postComment, placeholder }: Props) => {
  const [value, setValue] = useState<string>("");

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClick = () => {
    if (value.trim()) {
      commentOnPost();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (value.trim() && event.key === "Enter") {
      commentOnPost();
    }
  };

  const commentOnPost = () => {
    postComment(value.trim());
    setValue("");
  };

  return (
    <div className={["mb-2 mt-2 flex flex-row rounded-xl border bg-white px-2"].join(" ")}>
      <input
        autoFocus
        value={value}
        onKeyDown={onKeyDown}
        onChange={onTextChange}
        placeholder={placeholder}
        className="w-full p-2 outline-none"
      />
      <button onClick={onClick}>
        <FiSend className="my-auto" size={24} />
      </button>
    </div>
  );
};
