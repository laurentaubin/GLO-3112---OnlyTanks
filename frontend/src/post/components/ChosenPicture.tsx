import React, { useState } from "react";
import { PopOverUserTagList } from "../../main/components/post/PopOverUserTagList";
import UserTag from "../../main/domain/UserTag";
import { PopOverHelperText } from "./PopOverHelperText";
import { UserTagInput } from "./UserTagInput";

interface Props {
  src: string;
  userTags: UserTag[];
  onTagDelete: (username: string) => void;
  onUserTagged: (userTag: UserTag) => void;
}

export const ChosenPicture = ({ src, userTags, onTagDelete, onUserTagged }: Props) => {
  const [showPopOverHelper, setShowPopOverHelper] = useState(true);
  const [showTagInput, setShowTagInput] = useState(false);
  const [mouseClickPosition, setMouseClickPosition] = useState([0, 0]);

  const onImageClick = (event: any) => {
    setShowPopOverHelper(false);
    const mouseClickPosition = computeRelativeMousePosition(event);
    setMouseClickPosition(mouseClickPosition);
    setShowTagInput((current) => !current);
  };

  const computeRelativeMousePosition = (event: any): number[] => {
    const bounds = event.target.getBoundingClientRect();
    const positionX = (event.clientX - bounds.left) / event.target.width;
    const positionY = (event.clientY - bounds.top) / event.target.height;
    return [positionX * 100, positionY * 100];
  };

  const onTagChosen = (username: string) => {
    const newTag: UserTag = { username, position: mouseClickPosition };
    onUserTagged(newTag);
  };

  const computeTagInputPosition = (): number[] => {
    const positionX = mouseClickPosition[0] > 65 ? mouseClickPosition[0] - 50 : mouseClickPosition[0];

    return [positionX, mouseClickPosition[1]];
  };

  return (
    <div className="mb-3 cursor-crosshair relative">
      <div onClick={onImageClick}>
        {showPopOverHelper && <PopOverHelperText text={"Click picture to tag users"} />}
        <img src={src} alt="Image" className="md:w-[30vw] mx-auto max-h-70 max-w-xs" />
        {showTagInput && (
          <UserTagInput modalPosition={computeTagInputPosition()} clickPosition={mouseClickPosition} onTagChosen={onTagChosen} />
        )}
      </div>
      <PopOverUserTagList userTags={userTags} open onTagDelete={onTagDelete} />
    </div>
  );
};
