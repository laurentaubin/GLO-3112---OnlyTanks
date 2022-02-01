import Link from "next/link";
import { ReactNode } from "react";

export interface NavItem {
  title: string;
  icon: ReactNode;
  href: string;
}

interface Props {
  item: NavItem;
  isActive?: boolean;
}

export const NavItem = ({ item, isActive }: Props) => {
  return (
    <Link href={item.href} passHref>
      <a
        className={
          "flex items-center m-2 py-2 pl-1 rounded-full w-full hover:bg-blue-100 hover:text-blue-400 cursor-pointer " +
          (isActive ? "" : "text-gray-500")
        }
      >
        <div>{item.icon}</div>
        <p className="ml-4 hidden lg:block">{item.title}</p>
      </a>
    </Link>
  );
};
