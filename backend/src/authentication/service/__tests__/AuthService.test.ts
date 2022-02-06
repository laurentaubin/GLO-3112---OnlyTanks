import User from "src/user/domain/User";
import UserRepository from "src/user/domain/UserRepository";
import UserAssembler from "src/user/service/UserAssembler";
import { instance, mock, when, deepEqual } from "ts-mockito";
import { UserRequest } from "../../../user/service/UserRequest";
import { UserResponse } from "../../../user/service/UserResponse";
import AuthProviderSelector from "../AuthProviderSelector";
import AuthService from "../AuthService";

describe("AuthService", () => {
  const mockedUserRepository = mock<UserRepository>();
  const userRepository = instance(mockedUserRepository);
  const mockedUserAssembler = mock<UserAssembler>();
  const userAssembler = instance(mockedUserAssembler);
  const mockedAuthProviderSelector = mock<AuthProviderSelector>();
  const authProviderSelector = instance(mockedAuthProviderSelector);
  const authService = new AuthService(userAssembler, userRepository, authProviderSelector);

  describe("given UserRepository creates and returns a user", () => {
    const aSignUpRequest: UserRequest = {
      username: "abv",
      firstName: "asd",
      lastName: "dsa",
      email: "email@email.com",
      phoneNumber: "1234567890"
    };

    const aUser: User = {
      username: "abv",
      firstName: "asd",
      lastName: "dsa",
      email: "email@email.com",
      phoneNumber: "1234567890"
    };

    const aSignUpResponse: UserResponse = {
      username: "abv",
      firstName: "asd",
      lastName: "dsa",
      email: "email@email.com",
      phoneNumber: "1234567890"
    };

    when(mockedUserAssembler.assembleUser(deepEqual(aSignUpRequest))).thenReturn(aUser);
    when(mockedUserRepository.save(aUser)).thenResolve(aUser);
    when(mockedUserAssembler.assembleUserResponse(aUser)).thenReturn(aSignUpResponse);

    describe("when signup", () => {
      it("should return new user", async () => {
        const newUser = await authService.signup(aUser);

        expect(newUser).toEqual(aSignUpResponse);
      });
    });
  });
});
