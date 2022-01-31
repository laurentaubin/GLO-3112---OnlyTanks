import React from "react";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import { State } from "../main/hooks/useAxios";
import { useUser } from "./api/useUser";

const UserProfile = () => {
  const { user, state } = useUser("e");

  if (state === State.LOADING) {
    return <SpinnerIcon size={20} />;
  }

  return (
    <div>
      Welcome {user?.firstName} {user?.lastName}
    </div>
  );
};

export default UserProfile;
