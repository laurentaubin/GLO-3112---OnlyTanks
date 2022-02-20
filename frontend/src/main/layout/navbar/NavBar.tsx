import { useRouter } from "next/router";
import { BiBell, BiHome, BiMessageDetail, BiSearchAlt, BiUser } from "react-icons/bi";
import { LoginButton } from "../../../authentication/components/login/LoginButton";
import { LogoutButton } from "../../../authentication/components/logout/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import { NavItem } from "./NavItem";
import { NewPostButton } from "./NewPostButton";

export const NavBar = () => {
  const { pathname, query } = useRouter();
  const { isLoggedIn, me } = useAuth();

  const navItems: NavItem[] = [
    {
      title: "Home",
      icon: <BiHome size={32} />,
      href: "/"
    },
    {
      title: "Notifications",
      icon: <BiBell size={32} />,
      href: "/notifications"
    },
    {
      title: "Messages",
      icon: <BiMessageDetail size={32} />,
      href: "/messages"
    },
    {
      title: "Search",
      icon: <BiSearchAlt size={32} />,
      href: "/search/users"
    },
    {
      title: "Profile",
      icon: <BiUser size={32} />,
      href: `/${me?.username}`
    }
  ];

  const getPathName = (title: string): string => {
    return title === "Profile" ? `/${query.username}` : pathname;
  };

  return (
    <div className="md:px-8 md:sticky md:top-0">
      <div className="bg-white px-6 py-2 md:py-4 mx-auto">
        <div className="-mx-4 w-full flex flex-row md:block">
          {isLoggedIn ? (
            <>
              {navItems.map((navItem) => {
                const pathName = getPathName(navItem.title);
                return <NavItem key={navItem.title} item={navItem} isActive={pathName === navItem.href} />;
              })}

              <LogoutButton />
              <NewPostButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
};
