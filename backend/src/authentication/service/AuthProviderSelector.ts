import AuthProvider from "../domain/AuthProvider";
import InvalidProviderEception from "../domain/exceptions/InvalidProviderException";
import Provider from "../domain/Provider";

export default class AuthProviderSelector {
  constructor(private googleAuthProvider: AuthProvider) {}

  select(provider: Provider): AuthProvider {
    switch (provider) {
      case Provider.GOOGLE:
        return this.googleAuthProvider;

      default:
        throw new InvalidProviderEception(provider);
    }
  }
}
