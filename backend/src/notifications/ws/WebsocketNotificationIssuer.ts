import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import NotificationIssuer from "../domain/NotificationIssuer";
import PostNotification from "../domain/PostNotification";
import PostNotificationMessageAssembler from "./PostNotificationMessageAssembler";
import ServerToClientEvents from "./ServerToClientEvents";

class WebsocketNotificationIssuer implements NotificationIssuer {
  constructor(
    private websocket: Server<DefaultEventsMap, ServerToClientEvents, DefaultEventsMap, unknown>,
    private assembler: PostNotificationMessageAssembler
  ) {}

  public listen() {
    this.websocket.on("connection", (socket) => {
      socket.on("user", (username) => {
        console.log(`User ${username} connected to socket with id ${socket.id}`);
        socket.join(username);
      });
    });
  }

  public issue(postNotification: PostNotification) {
    const message = this.assembler.assembleToPostNotificationMessage(postNotification);
    console.log(`Emitting event {type: ${message.type}, postId: ${message.postId}, from: ${message.from}} to ${message.to}`);
    this.websocket.to(message.to).emit("notification", message);
  }
}

export default WebsocketNotificationIssuer;
