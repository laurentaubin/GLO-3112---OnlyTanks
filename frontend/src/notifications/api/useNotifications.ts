import { useEffect } from "react";
import { useAxios } from "../../main/hooks/useAxios";
import NotificationAssembler from "./NotificationAssembler";

export const useNotifications = () => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    const getNotifications = () => {
      sendRequest({ url: "/notifications", method: "GET" });
    };

    getNotifications();
  }, []);

  return { notifications: data?.data.map(NotificationAssembler.assembleNotification), state, error };
};
