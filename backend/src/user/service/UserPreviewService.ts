import UserPreview from "../domain/UserPreview";

interface UserPreviewService {
  getUserPreview: (username: string) => Promise<UserPreview>;

  getUserPreviews: (usernames: string[]) => Promise<Awaited<UserPreview>[]>;

  updateTotalNumberOfLikes: (username: string, updatedTotalNumberOfLikes: number) => Promise<void>;
}

export default UserPreviewService;
