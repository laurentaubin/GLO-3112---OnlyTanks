import { useEffect, useState } from "react";
import RoundedImageSelector from "../../authentication/components/signup/RoundedImageSelector";
import Button from "../../main/components/Button";
import { useUpdateProfilePicture } from "../api/useUpdateProfilePicture";
import { useAuth } from "../../main/hooks/useAuth";
import User from "../../main/domain/user/User";
import { State } from "../../main/hooks/useAxios";
import Modal from "../../main/components/Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onUserUpdated: (user: User) => void;
}

const UpdateProfilePictureModal = ({ open, setOpen, onUserUpdated }: Props) => {
  const { me } = useAuth();
  const { updateProfilePicture, updatedUser, state, error } = useUpdateProfilePicture();
  const [imageSource, setImageSource] = useState("");
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (state === State.SUCCESS) {
      if (updatedUser) {
        onUserUpdated(updatedUser);
      }
      setOpen(false);
    }
  }, [state]);

  const onSaveClick = async () => {
    if (me && file) {
      await updateProfilePicture(me.username, file);
    }
  };

  const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImageSource(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Update profile picture">
      <div className="mt-6">
        <div className="flex justify-center">
          <RoundedImageSelector imageSource={imageSource} onImageSelected={onImageSelected} />
        </div>
        {error && <p className="mt-5 text-base text-red-500">There was an error uploading your picture</p>}
        <div className="flex flex-row justify-between">
          <Button text="Cancel" onClick={() => setOpen(false)} buttonClassName="text-gray-primary hover:bg-gray-pale border-2" />
          <Button
            text="Save"
            onClick={onSaveClick}
            buttonClassName={["text-white", !file ? "bg-gray-light" : "bg-blue-primary hover:bg-blue-500"].join(" ")}
            disabled={!file}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
