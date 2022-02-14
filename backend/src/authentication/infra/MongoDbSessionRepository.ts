import SessionRepository from "../domain/SessionRepository";
import MongoDbSessionAssembler from "./MongoDbSessionAssembler";
import Session from "../domain/Session";
import SessionModel, { SessionDto } from "./models/SessionModel";
import Token from "../domain/Token";

export default class MongoDbSessionRepository implements SessionRepository {
  constructor(private sessionAssembler: MongoDbSessionAssembler) {}

  public save = async (session: Session): Promise<void> => {
    const sessionModel = this.sessionAssembler.assembleSessionDto(session);
    await sessionModel.save();
  };

  public exists = async (token: Token): Promise<boolean> => {
    const sessionDto = (await SessionModel.findOne({ token: token.value })) as unknown as SessionDto;
    return !!sessionDto;
  };
}
