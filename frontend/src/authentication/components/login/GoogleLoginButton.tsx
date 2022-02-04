import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { getConfigForEnvironment } from "../../../config";
import { useLogin } from "../../api/useLogin";
import { State } from "../../../main/hooks/useAxios";
import { useRouter } from "next/router";
import AuthProvider from "../../domain/AuthProvider";

export const GoogleLoginButton = () => {
  const { data, state, loginUser } = useLogin();
  const [googleData, setGoogleData] = useState({} as GoogleLoginResponse | GoogleLoginResponseOffline);

  const router = useRouter();

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        if (data?.data.error) {
          handleLoginError();
          break;
        }

        // TODO set session cookies if no error and redirect to home page
        break;
      case State.ERROR:
        handleLoginError();
    }
  }, [state, googleData]);

  const handleLoginError = () => {
    if ("profileObj" in googleData) {
      const profile = googleData.profileObj;
      router.push({
        pathname: "/signup",
        query: {
          provider: AuthProvider.GOOGLE,
          firstName: profile.givenName,
          lastName: profile.familyName,
          email: profile.email
        }
      });
    }
  };

  const handleLogin = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void> => {
    if ("tokenId" in googleData) {
      const token = googleData.tokenId;
      loginUser(AuthProvider.GOOGLE, token);
      setGoogleData(googleData);
    }
  };

  return (
    <GoogleLogin
      clientId={getConfigForEnvironment().google.clientId}
      buttonText="SIGN IN WITH GOOGLE"
      onSuccess={handleLogin}
      cookiePolicy={"single_host_origin"}
    />
  );
};
