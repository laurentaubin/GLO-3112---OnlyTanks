import Link from "next/link";
import User from "../../main/domain/User";
import { UsersPreview } from "./UserPreview";

interface Props {
  users: User[];
}
export const UsersList = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
        <Link href={`/${user.username}`} passHref key={user.username}>
          <a>
            <UsersPreview key={user.username} user={user} />
          </a>
        </Link>
      ))}
    </>
  );
};
