import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <div className="mt-2">
      <button className="ml-2 w-12 h-12 rounded-full lg:w-full bg-blue-primary text-white hover:bg-blue-secondary" onClick={onClick}>
        <span className="relative float-left lg:ml-2">{<BiLogIn size={32} />}</span>
        <span className="hidden lg:block pt-1">Log In</span>
      </button>
    </div>
  );
};
