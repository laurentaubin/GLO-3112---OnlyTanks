import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getConfigForEnvironment } from "../../config";
import PostNotificationMessage from "../domain/notifications/PostNotificationMessage";
import ServerToClientEvents from "../domain/notifications/ServerToClientEvents";

const config = getConfigForEnvironment();

const serverAddress = config.server.port ? `${config.server.address}:${config.server.port}` : config.server.address;

export const useWebsockets = (event: any) => {
  const [data, setData] = useState<PostNotificationMessage>();
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, DefaultEventsMap>>();

  useEffect(() => {
    setSocket(io(serverAddress));
  }, []);

  const connect = (username?: string) => {
    socket?.on("connect", () => {
      if (username) socket.emit("user", username);
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(event, (notification: PostNotificationMessage) => {
      setData(notification);
    });
  }, [event, socket]);

  return { data, connect };
};
