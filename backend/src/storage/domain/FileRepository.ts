import StorageReport from "./StorageReport";
import File from "./File";

interface FileRepository {
  storeImage(file: File): Promise<StorageReport>;
}

export default FileRepository;
