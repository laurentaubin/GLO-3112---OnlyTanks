export default class MissingTokenException extends Error {
  constructor() {
    super("Token is missing");
  }
}
