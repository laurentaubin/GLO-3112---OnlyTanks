import { useCallback } from "react";
import { useWebsockets } from "../../main/hooks/useWebsockets";
import NotificationAssembler from "./NotificationAssembler";

export const useRealTimeNotifications = () => {
  const { data, connect } = useWebsockets("notification");

  const assembledNotification = useCallback(() => {
    return data ? NotificationAssembler.assembleNotification(data) : null;
  }, [data]);

  return { notification: assembledNotification(), connect };
};
