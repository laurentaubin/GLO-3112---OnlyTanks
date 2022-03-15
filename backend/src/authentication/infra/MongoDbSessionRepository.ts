import SessionRepository from "../domain/SessionRepository";
import MongoDbSessionAssembler from "./MongoDbSessionAssembler";
import Session from "../domain/Session";
import SessionModel, { SessionDto } from "./models/SessionModel";
import Token from "../domain/Token";
import SessionNotFoundException from "../domain/exceptions/SessionNotFoundException";

export default class MongoDbSessionRepository implements SessionRepository {
  constructor(private sessionAssembler: MongoDbSessionAssembler) {}

  public save = async (session: Session): Promise<void> => {
    const sessionModel = this.sessionAssembler.assembleSessionDto(session);
    await sessionModel.save();
  };

  public exists = async (token: Token): Promise<boolean> => {
    const sessionDto = await this.findUserWithToken(token);
    return !!sessionDto;
  };

  public findUsernameWithToken = async (token: Token): Promise<string> => {
    const sessionDto = await this.findUserWithToken(token);
    return sessionDto.username;
  };

  private findUserWithToken = async (token: Token): Promise<SessionDto> => {
    return (await SessionModel.findOne({ token: token.value })) as unknown as SessionDto;
  };

  public async delete(username: string): Promise<void> {
    try {
      await SessionModel.deleteOne({ username });
    } catch (e) {
      throw new SessionNotFoundException();
    }
  }
}
