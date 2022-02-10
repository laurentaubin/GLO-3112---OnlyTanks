import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { constants } from "../../constants/constants";

export const useAuth = () => {
  const [cookies, _] = useCookies([constants.SESSION_TOKEN_COOKIE]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    cookies[constants.SESSION_TOKEN_COOKIE] ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [cookies]);

  return { isLoggedIn };
};
