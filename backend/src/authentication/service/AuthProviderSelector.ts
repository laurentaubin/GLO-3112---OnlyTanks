import AuthProvider from "../infra/AuthProvider";
import Provider from "../domain/Provider";

export default class AuthProviderSelector {
  constructor(private localAuthProvider: AuthProvider, private googleAuthProvider: AuthProvider) {}

  select(provider: Provider): AuthProvider {
    switch (provider) {
      case Provider.GOOGLE: {
        return this.googleAuthProvider;
      }
      default: {
        return this.localAuthProvider;
      }
    }
  }
}
