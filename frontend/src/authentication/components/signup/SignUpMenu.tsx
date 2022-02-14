import React from "react";
import Link from "next/link";
import { FormHeader } from "../../../main/components/FormHeader";
import { FormLayout } from "../../../main/components/FormLayout";
import { MenuItem } from "../../../main/components/MenuItem";
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
          <a className="text-blue-primary font-semibold">Log in</a>
        </Link>
      </MenuItem>
    </div>
  );
};
