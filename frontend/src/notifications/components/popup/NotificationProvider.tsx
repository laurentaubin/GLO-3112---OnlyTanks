import { ReactNode, useEffect } from "react";
import { useAuth } from "../../../main/hooks/useAuth";
import { useRealTimeNotifications } from "../../api/useRealTimeNotifications";
import { DisplayedNotification } from "./DisplayedNotification";

interface Props {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const { me } = useAuth();
  const { notification, connect } = useRealTimeNotifications();

  useEffect(() => {
    connect(me?.username);
  }, [me?.username, connect]);

  return (
    <>
      <DisplayedNotification notification={notification} />
      {children}
    </>
  );
};
