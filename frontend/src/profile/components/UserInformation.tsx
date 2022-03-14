import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import User from "../../main/domain/user/User";
import { useAuth } from "../../main/hooks/useAuth";
import formatTimestamp from "../../main/utils/formatTimestamp";
import { formatInputs } from "../../main/utils/inputUtils";
import EditProfileModal from "./EditProfileModal";
import ProfilePicture from "./ProfilePicture";

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
      {editProfileModalOpen && (
        <EditProfileModal open={editProfileModalOpen} setOpen={setEditProfileModalOpen} onUserUpdated={onUserUpdated} user={user} />
      )}
      <ProfilePicture imageUrl={user.imageUrl} size="10em" />
      <div className="flex flex-row">
        <div className="ml-5">
          <h1 className="text-2xl font-medium">@{user.username}</h1>
          <h1 className="text-base">{user.firstName + " " + user.lastName}</h1>
          <h1 className="text-base text-gray-500">{user.email}</h1>
          <h1 className="text-base text-gray-500">{formatInputs(user).phoneNumber}</h1>
          <h1 className="text-base text-gray-500">Member since {formatTimestamp({ datetime: dayjs(user?.createdAt).toDate() })}</h1>
        </div>
        {username === me?.username && (
          <div className="sm:hidden flex justify-end self-start w-full" onClick={() => setEditProfileModalOpen(true)}>
            <BiEdit className="cursor-pointer rounded-xl hover:bg-slate-200" size={30}></BiEdit>
          </div>
        )}
      </div>
      {username === me?.username && (
        <div className="sm:flex justify-end self-start w-full hidden" onClick={() => setEditProfileModalOpen(true)}>
          <BiEdit className="cursor-pointer rounded-xl hover:bg-slate-200" size={30}></BiEdit>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
