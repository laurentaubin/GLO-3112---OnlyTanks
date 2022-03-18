import React from "react";
import { FormHeader } from "../../../main/components/FormHeader";
import { FormLayout } from "../../../main/components/FormLayout";
import { MenuItem } from "../../../main/components/MenuItem";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const LoginMenu = () => {
  return (
    <div>
      <MenuItem variant="xl">
        <FormLayout>
          <FormHeader />
          <div className="mt-12">
            <GoogleLoginButton />
          </div>
        </FormLayout>
      </MenuItem>
    </div>
  );
};
