import { useState } from "react";
import UserTag from "../../domain/UserTag";
import { PopOverUserTagList } from "./PopOverUserTagList";

interface Props {
  className?: string;
  alt?: string;
  src: string;
  userTags: UserTag[];
}

export const PostImage = ({ className, src, alt, userTags }: Props) => {
  const [showTags, setShowTags] = useState(false);

  const onImageClick = () => {
    setShowTags((current) => !current);
  };

  return (
    <div className="relative cursor-pointer" onClick={onImageClick}>
      <img className={className} src={src} alt={alt ? alt : "Post"} />
      <PopOverUserTagList userTags={userTags} open={showTags} />
    </div>
  );
};
