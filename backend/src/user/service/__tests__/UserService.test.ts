import { mock, instance, when } from "ts-mockito";
import UserBuilder from "../../../__tests__/utils/UserBuilder";
import UserRepository from "../../domain/UserRepository";
import UserService from "../UserService";
import UserAssembler from "../UserAssembler";
import FileAssembler from "../../../storage/service/FileAssembler";
import FileRepository from "../../../storage/domain/FileRepository";
import UserPreviewAssembler from "../UserPreviewResponseAssembler";

describe("UserService", () => {
  const mockedUserRepository: UserRepository = mock<UserRepository>();
  const userRepository = instance(mockedUserRepository);

  const mockedFileRepository: FileRepository = mock<FileRepository>();
  const fileRepository = instance(mockedFileRepository);

  const userAssembler = new UserAssembler();
  const fileAssembler = new FileAssembler();
  const userPreviewAssembler = new UserPreviewAssembler();
  const userService = new UserService(userAssembler, userRepository, fileAssembler, fileRepository, userPreviewAssembler);

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
