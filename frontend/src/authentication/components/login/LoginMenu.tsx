import Link from "next/link";
import React from "react";
import { FormHeader } from "../../../main/components/FormHeader";
import { FormLayout } from "../../../main/components/FormLayout";
import { MenuItem } from "../../../main/components/MenuItem";
import { LoginForm } from "./LoginForm";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { getConfigForEnvironment } from "../../../config";

export const LoginMenu = () => {
  const config = getConfigForEnvironment();

  return (
    <div>
      <MenuItem variant="xl">
        <FormLayout>
          <FormHeader />
          <LoginForm />
        </FormLayout>
        {config.google.enabled && <GoogleLoginButton />}
      </MenuItem>

      <MenuItem variant="sm">
        <span>{"Don't have an account ? "}</span>
        <Link href="/signup">
          <a className="text-blue-primary font-semibold">Sign up</a>
        </Link>
      </MenuItem>
    </div>
  );
};
