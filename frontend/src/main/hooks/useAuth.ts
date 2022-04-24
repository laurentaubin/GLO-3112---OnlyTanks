import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { constants } from "../../constants/constants";
import UserAssembler from "../../profile/api/UserAssembler";
import UserResponse from "../../profile/api/UserResponse";
import { useAxios } from "./useAxios";

export const useAuth = () => {
  const [cookies] = useCookies([constants.SESSION_TOKEN_COOKIE]);

  const { data, sendRequest } = useAxios();

  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies[constants.SESSION_TOKEN_COOKIE]);

  useEffect(() => {
    cookies[constants.SESSION_TOKEN_COOKIE] ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [cookies]);

  useEffect(() => {
    const getMe = async () => {
      await sendRequest({ url: "/me", method: "GET" });
    };
    if (isLoggedIn) {
      getMe();
    }
  }, [isLoggedIn]);

  return { isLoggedIn, me: UserAssembler.assembleToUser(data?.data as UserResponse) };
};
