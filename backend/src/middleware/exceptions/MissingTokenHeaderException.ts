export default class MissingTokenHeaderException extends Error {
  constructor() {
    super("Missing token header");
  }
}
