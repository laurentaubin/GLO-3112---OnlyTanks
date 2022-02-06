import { FileRequest } from "src/storage/domain/FileRequest";

interface PostBody {
  caption: string;
  hashtags: string[];
  author: string;
  file: FileRequest;
}

export default PostBody;
