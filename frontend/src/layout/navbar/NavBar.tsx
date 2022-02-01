import { useRouter } from "next/router";
import { BiBell, BiHome, BiLogOut, BiMessageDetail, BiUser } from "react-icons/bi";
import { NavItem } from "./NavItem";
import { NewPostButton } from "./NewPostButton";

const navItems: NavItem[] = [
  {
    title: "Home",
    icon: <BiHome size={32} />,
    href: "/temp"
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
    title: "Profile",
    icon: <BiUser size={32} />,
    href: "/profile"
  },
  {
    title: "Log Out",
    icon: <BiLogOut size={32} />,
    href: "/logout"
  }
];

export const NavBar = () => {
  const { pathname } = useRouter();

  return (
    <div className="md:px-8 md:sticky md:top-0">
      <div className="bg-white px-6 py-4 mx-auto">
        <div className="-mx-4 w-full flex flex-row md:block">
          {navItems.map((navItem) => (
            <NavItem key={navItem.title} item={navItem} isActive={pathname === navItem.href} />
          ))}
          <NewPostButton />
        </div>
      </div>
    </div>
  );
};
