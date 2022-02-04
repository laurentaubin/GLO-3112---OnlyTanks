import Link from "next/link";
import React from "react";
import { FormHeader } from "../../../main/components/FormHeader";
import { FormLayout } from "../../../main/components/FormLayout";
import { MenuItem } from "../../../main/components/MenuItem";
import { LoginForm } from "./LoginForm";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const LoginMenu = () => {
  return (
    <div>
      <MenuItem variant="xl">
        <FormLayout>
          <FormHeader />
          <LoginForm />
        </FormLayout>
        <GoogleLoginButton />
      </MenuItem>

      <MenuItem variant="sm">
        <span>{"Don't have an account ? "}</span>
        <Link href="/signup">
          <a className="text-blue-600 font-semibold">Sign up</a>
        </Link>
      </MenuItem>
    </div>
  );
};
