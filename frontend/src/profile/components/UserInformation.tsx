import { useState } from "react";
import User from "../../main/domain/User";
import ProfilePicture from "./ProfilePicture";
import EditProfileModal from "./EditProfileModal";
import { useRouter } from "next/router";
import { useAuth } from "../../main/hooks/useAuth";
import Button from "../../main/components/Button";
import { BiEdit, BiEditAlt, BiMessageRoundedEdit } from "react-icons/bi";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { formatInputs } from "../../main/utils/inputUtils";

interface Props {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

const UserInformation = ({ user, onUserUpdated }: Props) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const router = useRouter();
  const { username } = router.query;
  const { me } = useAuth();

  return (
    <div className="flex flex-col items-center mt-10 sm:flex sm:flex-row">
      <EditProfileModal open={editProfileModalOpen} setOpen={setEditProfileModalOpen} onUserUpdated={onUserUpdated} user={user} />
      <ProfilePicture imageUrl={user?.imageUrl} size="10em" />
      <div className="ml-5">
        <div className="flex flex-row">
          <h1 className="text-2xl font-medium">{user ? user.firstName + " " + user.lastName : "User not found"}</h1>
          {username === me?.username && (
            <div className="ml-4 cursor-pointer rounded-xl hover:bg-slate-200" onClick={() => setEditProfileModalOpen(true)}>
              <BiEdit size={30}></BiEdit>
            </div>
          )}
        </div>
        <h1 className="text-base">@{user?.username}</h1>
        <h1 className="text-base">{user?.email}</h1>
        <h1 className="text-base">{formatInputs(user).phoneNumber}</h1>
      </div>
    </div>
  );
};

export default UserInformation;
