import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FormLayout = ({ children }: Props) => {
  return <div className="px-12 my-8">{children}</div>;
};
