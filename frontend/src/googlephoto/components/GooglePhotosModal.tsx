import { GooglePhoto } from "../GooglePhoto";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  photos: GooglePhoto[];
  handleCancel: () => void;
  onImageSelected: (googlePhoto: GooglePhoto) => void;
}

const GooglePhotosModal = ({ isOpen, photos, handleCancel, onImageSelected }: Props) => {
  const [selectedImage, setSelectedImage] = useState<GooglePhoto>();

  const handleImageClick = (googlePhoto: GooglePhoto) => {
    setSelectedImage(googlePhoto);
  };

  const handleImageSelected = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{"Select an image"}</DialogTitle>
      <DialogContent className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.src} className="items-center flex">
            <img
              src={photo.src}
              onClick={() => handleImageClick(photo)}
              className={selectedImage?.src === photo.src ? "border-4 border-sky-500" : ""}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleImageSelected} autoFocus>
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GooglePhotosModal;
