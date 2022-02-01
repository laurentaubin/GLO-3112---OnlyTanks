import { ReactNode } from "react";
import { NavBar } from "./navbar/NavBar";
import { SideBar } from "./SideBar";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="md:px-6">
      <div className="md:flex justify-between container mx-auto">
        <div className="md:-mx-12 lg:w-3/12 md:w-1/12 sticky top-0 z-50">
          <NavBar />
        </div>
        <div className="lg:w-6/12 sm:block w-11/12 md:border relative">{children}</div>
        <div className="-mx-8 w-3/12 hidden lg:block">
          <SideBar />
        </div>
      </div>
    </div>
  );
};
