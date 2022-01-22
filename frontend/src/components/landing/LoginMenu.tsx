import Image from "next/image";
import React from "react";
import { LoginForm } from "./LoginForm";

export const LoginMenu = () => {
  return (
    <div>
      <div className=" md:min-h-[50vh] max-w-sm md:border-2 bg-white">
        <div className="flex flex-col px-12 my-12">
          <div className="py-12 mb-12 relative">
            <Image src="/images/OnlyTanks-Logo-Full.svg" alt="OnlyTanks Logo" layout="fill" objectFit="scale-down" />
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="max-w-sm mt-2 py-4 md:border-2 bg-white">
        <span>{"Don't have an account ? "}</span>
        <a className="text-blue-600 font-semibold" href="/signup">
          Sign up
        </a>
      </div>
    </div>
  );
};
