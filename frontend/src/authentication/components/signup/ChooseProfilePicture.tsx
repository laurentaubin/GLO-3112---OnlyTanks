import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../../main/components/Button";
import { FormHeader } from "../../../main/components/FormHeader";
import { FormLayout } from "../../../main/components/FormLayout";
import { MenuItem } from "../../../main/components/MenuItem";
import RoundedImageSelector from "./RoundedImageSelector";
import { useUpdateProfilePicture } from "../../../profile/api/useUpdateProfilePicture";
import { State } from "../../../main/hooks/useAxios";

interface Props {
  username: string;
}

const ChooseProfilePicture = ({ username }: Props) => {
  const router = useRouter();
  const { updateProfilePicture, state, error } = useUpdateProfilePicture();

  const [imageSource, setImageSource] = useState("");
  const [file, setFile] = useState<File>();

  const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImageSource(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  const onSkipClick = () => {
    router.push("/");
  };

  const onNextClick = async () => {
    if (file) {
      await updateProfilePicture(username, file);
    }
  };

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        router.push("/");
        break;
    }
  }, [router, state]);

  return (
    <div>
      <MenuItem variant="xl">
        <FormLayout>
          <FormHeader text="Add a profile picture to your account" />
          <div className="flex justify-center">
            <RoundedImageSelector imageSource={imageSource} onImageSelected={onImageSelected} />
          </div>
          {error && <p className="mt-5 text-base text-red-500">There was an error uploading your picture</p>}
          <div className="flex flex-row justify-between">
            <Button text="Skip" onClick={onSkipClick} buttonClassName="text-gray-primary hover:bg-gray-pale" />
            <Button
              text="Next"
              onClick={onNextClick}
              buttonClassName={["text-white", !file ? "bg-gray-light" : "bg-blue-primary hover:bg-blue-500"].join(" ")}
              disabled={!file}
            />
          </div>
        </FormLayout>
      </MenuItem>
    </div>
  );
};

export default ChooseProfilePicture;
