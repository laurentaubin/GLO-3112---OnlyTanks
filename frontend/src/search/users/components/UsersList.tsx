import Link from "next/link";
import User from "../../../main/domain/user/User";
import { UsersPreview } from "./UserPreview";

interface Props {
  users: User[];
}
export const UsersList = ({ users }: Props) => {
  return (
    <div className="flex flex-row flex-wrap">
      {users.map((user) => (
        <Link href={`/${user.username}`} passHref key={user.username}>
          <div className="w-full md:w-[50%]">
            <a>
              <UsersPreview key={user.username} user={user} />
            </a>
          </div>
        </Link>
      ))}
    </div>
  );
};
