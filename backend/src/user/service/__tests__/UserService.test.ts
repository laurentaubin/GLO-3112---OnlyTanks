import { mock, instance, when } from "ts-mockito";
import UserBuilder from "../../../__tests__/utils/UserBuilder";
import UserRepository from "../../domain/UserRepository";
import UserService from "../UserService";

describe("UserService", () => {
  const mockedUserRepository: UserRepository = mock<UserRepository>();
  const userRepository = instance(mockedUserRepository);
  const userService = new UserService(userRepository);

  describe("given a username", () => {
    const aUsername = "pablo";
    const aUser = new UserBuilder().build();

    beforeEach(() => {
      when(mockedUserRepository.findByUsername(aUsername)).thenReturn(Promise.resolve(aUser));
    });

    describe("when findByUsername", () => {
      it("should findByUsername", async () => {
        const actualUser = await userService.findByUsername(aUsername);

        expect(actualUser).toEqual(aUser);
      });
    });
  });
});
