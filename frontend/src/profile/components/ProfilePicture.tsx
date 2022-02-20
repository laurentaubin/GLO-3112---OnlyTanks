interface Props {
  imageUrl: string | undefined;
  size: number | string;
}

const ProfilePicture = ({ imageUrl, size }: Props) => {
  return <img style={{ width: size, height: size }} className="rounded-full border-2 mb-2" src={imageUrl} alt="" />;
};

export default ProfilePicture;
