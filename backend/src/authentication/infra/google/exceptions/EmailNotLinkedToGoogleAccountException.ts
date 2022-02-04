export default class EmailNotLinkedToGoogleAccountException extends Error {
  constructor() {
    super("Email not linked to Google account");
  }
}
