import { FileRequest } from "./FileRequest";
import StorageResponse from "./S3StorageResponse";

interface PictureStorage {
  store(file: FileRequest): Promise<StorageResponse>;
}

export default PictureStorage;
