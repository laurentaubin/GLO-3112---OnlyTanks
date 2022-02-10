import SessionModel, { SessionDto } from "./models/SessionModel";
import Session from "../domain/Session";

export default class MongoDbSessionAssembler {
  assembleSessionDto(session: Session) {
    return new SessionModel({
      username: session.username,
      token: session.token.value
    });
  }

  assembleSession = (sessionDto: SessionDto): Session => {
    return {
      username: sessionDto.username,
      token: { value: sessionDto.token }
    };
  };
}
