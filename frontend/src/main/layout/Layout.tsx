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
        <div className="md:-mx-12 lg:w-3/12 md:w-2/12 sticky top-0 z-10">
          <NavBar />
        </div>
        <div className="lg:w-6/12 block md:w-10/12 relative w-11/12 mx-auto mb-4">{children}</div>
        <div className="-mx-8 w-3/12 hidden lg:block">
          <SideBar />
        </div>
      </div>
    </div>
  );
};
