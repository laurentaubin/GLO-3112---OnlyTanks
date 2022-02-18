import User from "../../main/domain/User";
import ProfilePicture from "./ProfilePicture";

interface Props {
  user: User;
}

const UserInformation = ({ user }: Props) => {
  return (
    <div className="flex flex-row items-center mt-10">
      <ProfilePicture imageUrl={user?.imageUrl} size="10em" />
      <div className="ml-5">
        <h1 className="text-2xl font-medium">{user ? user.firstName + " " + user.lastName : "User not found"}</h1>
        <h1 className="text-base">@{user?.username}</h1>
        <h1 className="text-base">{user?.email}</h1>
      </div>
    </div>
  );
};

export default UserInformation;
