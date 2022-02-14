import { Request } from "express";
import FileRequest from "../../storage/types/FileRequest";

interface PostRequest extends Request<Record<string, unknown>> {
  file: FileRequest;
}

export default PostRequest;
