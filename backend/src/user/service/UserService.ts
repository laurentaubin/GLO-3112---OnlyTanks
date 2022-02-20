import UserRepository from "../domain/UserRepository";
import MultipleUsersResponse from "./MultipleUsersResponse";
import UserAssembler from "./UserAssembler";
import UserRequest from "./UserRequest";
import UserResponse from "./UserResponse";
import UploadProfilePictureRequestBody from "../api/UploadProfilePictureRequestBody";
import FileRepository from "../../storage/domain/FileRepository";
import FileAssembler from "../../storage/service/FileAssembler";
import File from "../../storage/domain/File";

class UserService {
  constructor(
    private userAssembler: UserAssembler,
    private userRepository: UserRepository,
    private fileAssembler: FileAssembler,
    private fileRepository: FileRepository
  ) {}

  public async findByUsername(username: string): Promise<UserResponse> {
    const user = await this.userRepository.findByUsername(username);
    return this.userAssembler.assembleUserResponse(user);
  }

  public async updateUserInformation(userRequest: UserRequest): Promise<UserResponse> {
    const user = this.userAssembler.assembleUser(userRequest);
    const updatedUser = await this.userRepository.updateUserInformation(user);

    return this.userAssembler.assembleUserResponse(updatedUser);
  }

  public async findAll(): Promise<MultipleUsersResponse> {
    const users = await this.userRepository.findAll();

    return this.userAssembler.assembleMultipleUsersResponse(users);
  }

  public async uploadProfilePicture(request: UploadProfilePictureRequestBody): Promise<void> {
    const file: File = this.fileAssembler.assembleFile(request.file);

    const storageReport = await this.fileRepository.storeImage(file);

    await this.userRepository.updateUserPicture(request.username, storageReport.imageUrl);
  }
}

export default UserService;
