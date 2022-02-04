export default class MissingUsernameException extends Error {
  constructor() {
    super("Username not provided or is empty");
  }
}
