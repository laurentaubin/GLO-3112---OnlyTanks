import Link from "next/link";
import User from "../../main/domain/User";
import ProfilePicture from "../../profile/components/ProfilePicture";

interface Props {
  user: User;
}
export const UsersPreview = ({ user }: Props) => {
  return (
    <Link href={`/${user.username}`} passHref>
      <div className="border-2 m-1 rounded-md">
        <div className="flex m-2">
          <ProfilePicture
            imageUrl="https://www.army-technology.com/wp-content/uploads/sites/3/2012/02/Image-1-Merkava-4-Israel-Defence-Forces-Main-Battle-Tank.jpg"
            size="5em"
          />
          <div className="flex-col">
            <div className="ml-2 font-bold text-xl">
              {user.firstName} {user.lastName} @{user.username}
            </div>
            <div className="ml-2 font-normal text-sm">{user.email}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
