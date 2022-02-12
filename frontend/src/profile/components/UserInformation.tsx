import { useState } from "react";
import User from "../../main/domain/User";
import ProfilePicture from "./ProfilePicture";

interface Props {
  user: User | undefined;
}

const UserInformation = ({ user }: Props) => {
  return (
    <div className="flex flex-col mt-10 ml-10">
      <ProfilePicture
        imageUrl="https://www.army-technology.com/wp-content/uploads/sites/3/2012/02/Image-1-Merkava-4-Israel-Defence-Forces-Main-Battle-Tank.jpg"
        size="10em"
      />
      <div>
        <h1 className="text-2xl font-medium">{user ? user.firstName + " " + user.lastName : "User not found"}</h1>
        <h1 className="text-base">@{user?.username}</h1>
        <h1 className="text-base">{user?.email}</h1>
      </div>
    </div>
  );
};

export default UserInformation;
