import User from "../../../main/domain/user/User";
import ProfilePicture from "../../../profile/components/ProfilePicture";

interface Props {
  user: User;
  variant?: "sm" | "lg";
}
export const UsersPreview = ({ user, variant = "lg" }: Props) => {
  return (
    <div className={["border-2 m-1 rounded-md hover:bg-gray-100", variant === "lg" ? "cursor-pointer" : ""].join(" ")}>
      <div className="flex m-2">
        <ProfilePicture imageUrl={user.imageUrl} size={variant === "lg" ? "5em" : "2em"} />
        <div className="flex-col">
          <div className={["ml-2 text-left", variant === "lg" ? "text-xl" : "text-sm"].join(" ")}>
            <p className="font-semibold">@{user.username}</p>
            <p className="text-sm">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
