import FileRequest from "../../storage/types/FileRequest";
import UserTagsDto from "./UserTagsDto";

interface PostRequestBody {
  caption: string;
  hashtags: string[];
  author: string;
  userTags: UserTagsDto[];
  file: FileRequest;
}

export default PostRequestBody;
