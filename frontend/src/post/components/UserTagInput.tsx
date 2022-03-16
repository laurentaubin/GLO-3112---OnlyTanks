import { useSearchUsers } from "../../search/users/api/useSearchUsers";
import { UsersPreview } from "../../search/users/components/UserPreview";

interface Props {
  modalPosition: number[];
  clickPosition: number[];
  onTagChosen: (username: string) => void;
}

export const UserTagInput = ({ modalPosition, clickPosition, onTagChosen }: Props) => {
  const { users } = useSearchUsers();

  return (
    <>
      <div className="absolute w-4 h-4 bg-white -rotate-45" style={{ left: `${clickPosition[0] + 1}%`, top: `${clickPosition[1] - 1}%` }} />
      <div
        className="absolute bg-white text-center z-10 rounded-sm shadow-2xl md:max-w-[24rem] cursor-default"
        style={{ left: `${modalPosition[0]}%`, top: `${modalPosition[1]}%` }}
      >
        <h1 className="font-semibold text-xl">Tag a user</h1>
        <div className=" max-h-64 overflow-y-scroll">
          {users.map((user) => (
            <div key={user.username} className="cursor-pointer" onClick={() => onTagChosen(user.username)}>
              <UsersPreview user={user} variant="sm" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
