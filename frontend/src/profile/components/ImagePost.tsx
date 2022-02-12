import react from "react";

interface Props {
  imageUrl: string;
}

const ImagePost = ({ imageUrl }: Props) => {
  return (
    <div>
      <img src={imageUrl} style={{ height: 180 }} alt="display image" />
    </div>
  );
};

export default ImagePost;
