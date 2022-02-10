export default class InvalidTokenException extends Error {
  constructor() {
    super("Token is invalid");
  }
}
