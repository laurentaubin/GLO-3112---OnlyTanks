import { UserDto } from "../models/UserModel";
import MongoDbUserAssembler from "../MongoDbUserAssembler";
import User from "../../domain/User";

describe("MongoDbUserAssembler", () => {
  const userAssembler = new MongoDbUserAssembler();
  const aUsername = "frankTheTank";
  const aFirstName = "Franky";
  const aLastName = "Boy";
  const anEmail = "franky@email.com";
  const aPhoneNumber = "418-123-4567";
  const anImageUrl = "123.com";
  const aCreationDate = 342567854321;
  const aTotalNumberOfLikes = 432;

  describe("given a UserDto", () => {
    const aUserDto: UserDto = {
      username: aUsername,
      firstName: aFirstName,
      lastName: aLastName,
      email: anEmail,
      phoneNumber: aPhoneNumber,
      imageUrl: anImageUrl,
      createdAt: aCreationDate,
      totalNumberOfLikes: aTotalNumberOfLikes
    };

    describe("when assembling to types", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleUser(aUserDto);

        const expected: User = {
          username: aUsername,
          firstName: aFirstName,
          lastName: aLastName,
          email: anEmail,
          phoneNumber: aPhoneNumber,
          imageUrl: anImageUrl,
          createdAt: aCreationDate,
          totalNumberOfLikes: aTotalNumberOfLikes
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
      phoneNumber: aPhoneNumber,
      imageUrl: anImageUrl,
      createdAt: aCreationDate
    };

    describe("when assembling to user dto", () => {
      it("should assemble with corresponding parameters", () => {
        const actual = userAssembler.assembleUserDto(aUser);

        expect(actual.email).toEqual(anEmail);
        expect(actual.username).toEqual(aUsername);
        expect(actual.firstName).toEqual(aFirstName);
        expect(actual.lastName).toEqual(aLastName);
        expect(actual.phoneNumber).toEqual(aPhoneNumber);
        expect(actual.imageUrl).toEqual(anImageUrl);
      });
    });
  });
});
