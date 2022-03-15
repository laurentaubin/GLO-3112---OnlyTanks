import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import User from "../../main/domain/user/User";
import { useAuth } from "../../main/hooks/useAuth";
import formatTimestamp from "../../main/utils/formatTimestamp";
import { formatInputs } from "../../main/utils/inputUtils";
import EditProfileModal from "./EditProfileModal";
import DeleteAccountModal from "./DeleteAccountModal";
import ProfilePicture from "./ProfilePicture";

interface Props {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

const UserInformation = ({ user, onUserUpdated }: Props) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const router = useRouter();
  const { username } = router.query;
  const { me } = useAuth();

  return (
    <div className="flex flex-col items-center mt-10 sm:flex sm:flex-row justify-between">
      {editProfileModalOpen && (
        <EditProfileModal open={editProfileModalOpen} setOpen={setEditProfileModalOpen} onUserUpdated={onUserUpdated} user={user} />
      )}
      {deleteAccountModalOpen && <DeleteAccountModal open={deleteAccountModalOpen} setOpen={setDeleteAccountModalOpen} />}
      <div className="flex flex-row">
        <ProfilePicture imageUrl={user.imageUrl} size="10em" />
        <div className="ml-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">@{user.username}</h1>
            <h1 className="text-base">{user.firstName + " " + user.lastName}</h1>
            <h1 className="text-base text-gray-500">{user.email}</h1>
            <h1 className="text-base text-gray-500">{formatInputs(user).phoneNumber}</h1>
            <h1 className="text-base text-gray-500">Member since {formatTimestamp({ datetime: dayjs(user?.createdAt).toDate() })}</h1>
          </div>
        </div>
      </div>
      {username === me?.username && (
        <div className="flex flex-row">
          <BiEdit onClick={() => setEditProfileModalOpen(true)} className="cursor-pointer rounded-xl hover:bg-slate-200" size={30} />
          <BiTrash onClick={() => setDeleteAccountModalOpen(true)} className="cursor-pointer rounded-xl hover:bg-slate-200" size={30} />
        </div>
      )}
    </div>
  );
};

export default UserInformation;
