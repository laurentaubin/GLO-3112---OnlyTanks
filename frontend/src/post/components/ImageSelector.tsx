import UserTag from "../../main/domain/UserTag";
import { ChosenPicture } from "./ChosenPicture";

interface Props {
  imageSource: string;
  userTags: UserTag[];
  onTagDelete: (username: string) => void;
  onImageSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUserTagged: (userTag: UserTag) => void;
}

const ImageSelector = ({ imageSource, userTags, onTagDelete, onImageSelected, onUserTagged }: Props) => {
  return (
    <div className="flex justify-center">
      {imageSource ? (
        <ChosenPicture src={imageSource} userTags={userTags} onTagDelete={onTagDelete} onUserTagged={onUserTagged} />
      ) : (
        <div>
          <label className="form-label inline-block mb-2 text-gray-700">Select an image to post</label>
          <input
            onChange={onImageSelected}
            accept="image/*"
            className="form-control block w-full px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-primary focus:outline-none"
            type="file"
            id="formFile"
            title=" "
          />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
