import { GoogleButton } from "./GoogleButton";

interface Props {
  createGoogleAuthLink: () => Promise<void>;
  handleGetGooglePhotosClick: () => Promise<void>;
  isConnectedToGooglePhotos: boolean;
}

export const GooglePhotosButton = ({ createGoogleAuthLink, handleGetGooglePhotosClick, isConnectedToGooglePhotos }: Props) => {
  return (
    <div className="flex mx-auto">
      {!isConnectedToGooglePhotos ? (
        <GoogleButton onClick={createGoogleAuthLink} text={"Connect to Google Photos"} />
      ) : (
        <GoogleButton onClick={handleGetGooglePhotosClick} text={"Select from Google Photos"} />
      )}
    </div>
  );
};
