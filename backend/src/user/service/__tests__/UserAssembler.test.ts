import User from "src/user/domain/User";
import UserAssembler from "../assemblers/UserAssembler";
import { UserRequest } from "../dtos/UserRequest";
import { UserResponse } from "../dtos/UserResponse";

describe("UserAssembler", () => {
  const userAssembler = new UserAssembler();
  const aUsername = "frankTheTank";
  const aFirstName = "Franky";
  const aLastName = "Boy";
  const anEmail = "franky@email.com";
  const aPhoneNumber = "418-123-4567";

  describe("given a SignUpRequest", () => {
    const aSignUpRequest: UserRequest = {
      username: aUsername,
      firstName: aFirstName,
      lastName: aLastName,
      email: anEmail,
      phoneNumber: aPhoneNumber
    };

    describe("when assembling user", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleUser(aSignUpRequest);

        const expected: User = {
          username: aUsername,
          firstName: aFirstName,
          lastName: aLastName,
          email: anEmail,
          phoneNumber: aPhoneNumber
        };

        expect(actual).toEqual(expected);
      });
    });
  });
  describe("given a User", () => {
    const aUser: User = {
      username: aUsername,
      firstName: aFirstName,
      lastName: aLastName,
      email: anEmail,
      phoneNumber: aPhoneNumber
    };

    describe("when assembling sign up response", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleSignUpResponse(aUser);

        const expected: UserResponse = {
          username: aUsername,
          firstName: aFirstName,
          lastName: aLastName,
          email: anEmail,
          phoneNumber: aPhoneNumber
        };

        expect(actual).toEqual(expected);
      });
    });
  });
});
