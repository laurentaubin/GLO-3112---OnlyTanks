import Provider from "../Provider";

export default class InvalidProviderEception extends Error {
  constructor(provider: Provider) {
    super(`${provider} is not a valid Auth Provider`);
  }
}
