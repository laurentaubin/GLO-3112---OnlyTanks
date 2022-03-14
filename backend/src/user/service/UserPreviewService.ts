import UserPreview from "../domain/UserPreview";

interface UserPreviewService {
  getUserPreviews: (usernames: string[]) => Promise<Awaited<UserPreview>[]>;
}

export default UserPreviewService;
