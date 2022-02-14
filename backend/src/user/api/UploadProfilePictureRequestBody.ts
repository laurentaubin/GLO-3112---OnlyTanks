import FileRequest from "../../storage/types/FileRequest";

interface UploadProfilePictureRequestBody {
  username: string;
  file: FileRequest;
}

export default UploadProfilePictureRequestBody;
