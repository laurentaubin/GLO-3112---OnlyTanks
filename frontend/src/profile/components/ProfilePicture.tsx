import UpdateProfilePictureModal from "./UpdateProfilePictureModal";
import { useState } from "react";
import User from "../../main/domain/user/User";

interface Props {
  isMe?: boolean;
  onUserUpdated?: (user: User) => void;
  imageUrl: string | undefined;
  size: number | string;
}

const ProfilePicture = ({ isMe = false, onUserUpdated, imageUrl, size }: Props) => {
  const [isUpdatePictureModalOpen, setIsUpdatePictureModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onImageClick = () => {
    if (isMe) {
      setIsUpdatePictureModalOpen(true);
    }
  };

  return (
    <>
      {isMe && (
        <>
          <UpdateProfilePictureModal open={isUpdatePictureModalOpen} setOpen={setIsUpdatePictureModalOpen} onUserUpdated={onUserUpdated!} />
          {isHovering && <h1 className="text-base font-semibold absolute text-center ml-14">Update</h1>}
        </>
      )}
      <img
        style={{ width: size, height: size }}
        onClick={onImageClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={["rounded-full border-2 mb-2", isMe && "hover:opacity-50 hover:cursor-pointer"].join(" ")}
        src={imageUrl}
        alt=""
      />
    </>
  );
};

export default ProfilePicture;
