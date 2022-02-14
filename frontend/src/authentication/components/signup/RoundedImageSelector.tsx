import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import Colors from "../../../main/utils/Colors";

interface Props {
  imageSource?: string;
  onImageSelected?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RoundedImageSelector = ({ imageSource, onImageSelected }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <div
      className="w-36 h-36 rounded-full flex justify-center items-center bg-gray-pale  hover:cursor-pointer hover:bg-gray-light"
      onClick={handleClick}
    >
      {!imageSource && <IoMdAdd size={50} color={Colors.lightGray} />}
      <input ref={hiddenFileInput} onChange={onImageSelected} accept="image/*" type="file" className="hidden" title=" " />
      {imageSource && <img className="w-36 h-36 rounded-full object-cover" src={imageSource} alt="Image selector" />}
    </div>
  );
};

export default RoundedImageSelector;
