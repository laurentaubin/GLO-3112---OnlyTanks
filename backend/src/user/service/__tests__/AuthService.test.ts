import User from "src/user/domain/User";
import UserRepository from "src/user/domain/UserRepository";
import UserAssembler from "src/user/service/assemblers/UserAssembler";
import { instance, mock, when, deepEqual } from "ts-mockito";
import AuthService from "../AuthService";
import { UserRequest } from "../dtos/UserRequest";
import { UserResponse } from "../dtos/UserResponse";

describe("AuthService", () => {
  const mockedUserRepository = mock<UserRepository>();
  const userRepository = instance(mockedUserRepository);
  const mockedUserAssembler = mock<UserAssembler>();
  const userAssembler = instance(mockedUserAssembler);
  const authService = new AuthService(userAssembler, userRepository);

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
    when(mockedUserAssembler.assembleSignUpResponse(aUser)).thenReturn(aSignUpResponse);

    describe("when signup", () => {
      it("should return new user", async () => {
        const newUser = await authService.signup(aUser);

        expect(newUser).toEqual(aSignUpResponse);
      });
    });
  });
});
