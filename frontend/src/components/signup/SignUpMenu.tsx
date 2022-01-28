import Link from "next/link";
import React from "react";
import { FormHeader } from "../shared/FormHeader";
import { FormLayout } from "../shared/FormLayout";
import { MenuItem } from "../shared/MenuItem";
import { SignUpForm } from "./SignUpForm";

export const SignUpMenu = () => {
  return (
    <div>
      <MenuItem variant="xl">
        <FormLayout>
          <FormHeader text="Sign up to see photos and posts from other tank amateurs" />
          <SignUpForm />
        </FormLayout>
      </MenuItem>

      <MenuItem variant="sm">
        <span>{"Already have an account ? "}</span>
        <Link href="/">
          <a className="text-blue-600 font-semibold">Log in</a>
        </Link>
      </MenuItem>
    </div>
  );
};
