import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { getConfigForEnvironment } from "../../../config";
import { useLogin } from "../../api/useLogin";
import { State } from "../../../main/hooks/useAxios";
import { useRouter } from "next/router";
import AuthProvider from "../../domain/AuthProvider";
import { useCookies } from "react-cookie";
import { constants } from "../../../constants/constants";
import analyticsService, { AnalyticEvent } from "../../../services/analytics";

export const GoogleLoginButton = () => {
  const { data, state, loginUser } = useLogin();
  const [googleData, setGoogleData] = useState({} as GoogleLoginResponse | GoogleLoginResponseOffline);

  const router = useRouter();

  const [, setCookie] = useCookies([constants.SESSION_TOKEN_COOKIE, constants.AUTH_PROVIDER_COOKIE]);

  useEffect(() => {
    switch (state) {
      case State.SUCCESS:
        if (data?.data.error) {
          handleLoginError();
          break;
        }
        setCookies(data?.data.token);
        router.push("/");
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
          firstName: profile.givenName,
          lastName: profile.familyName,
          email: profile.email,
          authProvider: AuthProvider.GOOGLE,
          token: googleData.tokenId
        }
      });
    }
  };

  const setCookies = (token: string) => {
    setCookie(constants.AUTH_PROVIDER_COOKIE, AuthProvider.GOOGLE, { maxAge: constants.SESSION_TOKEN_TTL });
    setCookie(constants.SESSION_TOKEN_COOKIE, token, { maxAge: constants.SESSION_TOKEN_TTL });
  };

  const handleLogin = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void> => {
    if ("tokenId" in googleData) {
      analyticsService.logEvent(AnalyticEvent.LOGIN_WITH_GOOGLE);
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
