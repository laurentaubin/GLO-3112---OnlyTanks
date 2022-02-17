import User from "../../main/domain/User";
import { UsersPreview } from "./UserPreview";

interface Props {
  users: User[];
}
export const UsersList = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
        <UsersPreview key={user.username} user={user} />
      ))}
    </>
  );
};
