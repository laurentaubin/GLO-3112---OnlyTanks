import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { constants } from "../constants/constants";
import { useCookies } from "react-cookie";
import { NotificationProvider } from "../notifications/components/popup/NotificationProvider";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { useAuth } from "../main/hooks/useAuth";
import analyticsService from "../services/analytics";

Sentry.init({
  dsn: "https://ac1cb2f22baf4ef681774d36bf616ee1@o1116604.ingest.sentry.io/6150126",
  integrations: [new BrowserTracing()],

  tracesSampleRate: 1.0
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [cookies] = useCookies([constants.SESSION_TOKEN_COOKIE]);
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { me } = useAuth();

  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!cookies[constants.SESSION_TOKEN_COOKIE]);
  }, [cookies]);

  useEffect(() => {
    if (me && isLoggedIn) {
      analyticsService.setUser(me.username);
    }
  }, [me, isLoggedIn]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    if (!isLoggedIn && constants.RESTRICTED_PAGES.includes(router.pathname) && !accessToken) {
      router.push("/");
      return;
    }
    setLoaded(true);
  }, [isLoggedIn, router, loaded, cookies]);

  return (
    loaded && (
      <Sentry.ErrorBoundary>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </Sentry.ErrorBoundary>
    )
  );
};

export default MyApp;
