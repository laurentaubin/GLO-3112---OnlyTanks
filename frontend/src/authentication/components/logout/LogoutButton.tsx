import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { constants } from "../../../constants/constants";

export const LogoutButton = () => {
  const router = useRouter();

  const [, , removeCookies] = useCookies([constants.AUTH_PROVIDER_COOKIE, constants.SESSION_TOKEN_COOKIE]);

  const onClick = () => {
    handleRemoveCookies();
    router.push("/");
  };

  const handleRemoveCookies = () => {
    removeCookies(constants.AUTH_PROVIDER_COOKIE);
    removeCookies(constants.SESSION_TOKEN_COOKIE);
  };

  return (
    <button
      className={
        "flex items-center m-2 py-2 pl-1 rounded-full w-full hover:text-blue-primary hover:bg-blue-pale cursor-pointer text-gray-500"
      }
      onClick={onClick}
    >
      <div>
        <BiLogOut size={32} />
      </div>
      <p className="ml-4 hidden lg:block">Log Out</p>
    </button>
  );
};
