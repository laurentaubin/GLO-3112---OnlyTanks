import React from "react";
import { LoginMenu } from "./landing/LoginMenu";

export const LandingPage = () => {
  return (
    <div className="md:bg-slate-100 h-screen w-screen flex justify-center text-center md:items-center">
      <LoginMenu />
    </div>
  );
};
