import Session from "./Session";
import Token from "./Token";

interface SessionRepository {
  save(session: Session): Promise<void>;

  exists(token: Token): Promise<boolean>;
}

export default SessionRepository;
