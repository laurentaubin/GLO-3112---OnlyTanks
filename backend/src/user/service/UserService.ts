import UserRepository from "../domain/UserRepository";
import MultipleUsersResponse from "./MultipleUsersResponse";
import UserAssembler from "./UserAssembler";
import UserRequest from "./UserRequest";
import UserResponse from "./UserResponse";
import UploadProfilePictureRequestBody from "../api/UploadProfilePictureRequestBody";
import FileRepository from "../../storage/domain/FileRepository";
import FileAssembler from "../../storage/service/FileAssembler";
import File from "../../storage/domain/File";
import UserPreview from "../domain/UserPreview";
import UserPreviewService from "./UserPreviewService";
import Pagination from "../../utils/pagination/Pagination";
import UserPreviewAssembler from "./UserPreviewResponseAssembler";
import UserPreviewResponse from "./UserPreviewResponse";

class UserService implements UserPreviewService {
  constructor(
    private userAssembler: UserAssembler,
    private userRepository: UserRepository,
    private fileAssembler: FileAssembler,
    private fileRepository: FileRepository,
    private userPreviewAssembler: UserPreviewAssembler
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

  public async findByPartialUsername(startsBy: string): Promise<MultipleUsersResponse> {
    const users = await this.userRepository.findByPartialUsername(startsBy);

    return this.userAssembler.assembleMultipleUsersResponse(users);
  }

  public async uploadProfilePicture(request: UploadProfilePictureRequestBody): Promise<UserResponse> {
    const file: File = this.fileAssembler.assembleFile(request.file);

    const storageReport = await this.fileRepository.storeImage(file, true);

    const user = await this.userRepository.updateUserPicture(request.username, storageReport.imageUrl);

    return this.userAssembler.assembleUserResponse(user);
  }

  public async getUserPreview(username: string): Promise<UserPreview> {
    const user = await this.userRepository.findByUsername(username);
    return this.userPreviewAssembler.assembleUserPreview(user);
  }

  public getUserPreviews(usernames: string[]): Promise<Awaited<UserPreview>[]> {
    const userPreviews = usernames.map(async (username) => {
      const user = await this.userRepository.findByUsername(username);
      return { username: username, imageUrl: user.imageUrl, totalNumberOfLikes: user.totalNumberOfLikes };
    });
    return Promise.all(userPreviews);
  }

  public getPopularUserPreviews = async (pagination: Pagination): Promise<UserPreviewResponse[]> => {
    const popularUsers = await this.userRepository.findOrderedByTotalNumberOfLikes(pagination);
    return popularUsers
      .filter((popularUser) => popularUser.totalNumberOfLikes && popularUser.totalNumberOfLikes > 0)
      .map((popularUser) => this.userPreviewAssembler.assembleUserPreviewResponseFromUser(popularUser));
  };

  public updateTotalNumberOfLikes = async (username: string, updatedTotalNumberOfLikes: number): Promise<void> => {
    const user = await this.userRepository.findByUsername(username);
    user.totalNumberOfLikes = updatedTotalNumberOfLikes;
    await this.userRepository.updateUserInformation(user);
  };
}

export default UserService;
