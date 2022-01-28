import User from "src/user/domain/User";
import { UserDto } from "../models/UserModel";
import UserAssembler from "../UserAssembler";

describe("UserAssembler", () => {
  const userAssembler = new UserAssembler();
  const aUsername = "frankTheTank";
  const aFirstName = "Franky";
  const aLastName = "Boy";
  const anEmail = "franky@email.com";
  const aPhoneNumber = "418-123-4567";

  describe("given a UserDto", () => {
    const aUserDto: UserDto = {
      username: aUsername,
      firstName: aFirstName,
      lastName: aLastName,
      email: anEmail,
      phoneNumber: aPhoneNumber
    };

    describe("when assembling to domain", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleUser(aUserDto);

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

    describe("when assembling to external", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleUserDto(aUser);

        expect(actual.email).toEqual(anEmail);
        expect(actual.username).toEqual(aUsername);
        expect(actual.firstName).toEqual(aFirstName);
        expect(actual.lastName).toEqual(aLastName);
        expect(actual.phoneNumber).toEqual(aPhoneNumber);
      });
    });
  });
});
