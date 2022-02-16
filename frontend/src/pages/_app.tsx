import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { constants } from "../constants/constants";
import { useCookies } from "react-cookie";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cookies] = useCookies([constants.SESSION_TOKEN_COOKIE]);
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn] = useState(!!cookies[constants.SESSION_TOKEN_COOKIE]);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && constants.RESTRICTED_PAGES.includes(router.pathname)) {
      router.push("/");
      return;
    }
    setLoaded(true);
  }, [isLoggedIn, router, loaded, cookies]);

  return loaded && <Component {...pageProps} />;
};

export default MyApp;
