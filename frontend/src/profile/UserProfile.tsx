import React from "react";
import UserInformation from "./components/UserInformation";
import User from "../main/domain/User";

interface Props {
  user: User | undefined;
}

const UserProfile = ({ user }: Props) => {
  return <UserInformation user={user} />;
};

export default UserProfile;
