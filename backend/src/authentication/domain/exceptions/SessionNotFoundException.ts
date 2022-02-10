export default class SessionNotFoundException extends Error {
  constructor() {
    super("Session not found");
  }
}
