import { Request } from "express";
import { FileRequest } from "src/storage/domain/FileRequest";

interface PostRequest extends Request<Record<string, unknown>> {
  file: FileRequest;
}

export default PostRequest;
