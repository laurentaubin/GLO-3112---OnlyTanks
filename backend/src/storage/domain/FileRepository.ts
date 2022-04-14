import StorageReport from "./StorageReport";
import File from "./File";

interface FileRepository {
  storeImage(file: File, thumbnail?: boolean, preview?: boolean): Promise<StorageReport>;
}

export default FileRepository;
