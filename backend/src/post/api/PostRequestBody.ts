import FileRequest from "../../storage/types/FileRequest";

interface PostRequestBody {
  caption: string;
  hashtags: string[];
  author: string;
  file: FileRequest;
}

export default PostRequestBody;
