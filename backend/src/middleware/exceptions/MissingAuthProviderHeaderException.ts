export default class MissingAuthProviderHeaderException extends Error {
  constructor() {
    super("Missing auth provider header");
  }
}
