import { Request } from "express";
import FileRequest from "../../storage/types/FileRequest";

interface UploadProfilePictureRequest extends Request<Record<string, unknown>> {
  file: FileRequest;
}

export default UploadProfilePictureRequest;
