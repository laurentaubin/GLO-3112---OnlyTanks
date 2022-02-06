interface Props {
  imageUrl: string;
  size: number | string;
}

const ProfilePicture = ({ imageUrl, size }: Props) => {
  return <img style={{ width: size, height: size }} className="rounded-full" src={imageUrl} alt="" />;
};

export default ProfilePicture;
