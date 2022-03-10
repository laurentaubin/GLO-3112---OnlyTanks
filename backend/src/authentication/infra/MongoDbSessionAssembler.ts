import SessionModel from "./models/SessionModel";
import Session from "../domain/Session";

export default class MongoDbSessionAssembler {
  assembleSessionDto(session: Session) {
    return new SessionModel({
      username: session.username,
      token: session.token.value
    });
  }
}
