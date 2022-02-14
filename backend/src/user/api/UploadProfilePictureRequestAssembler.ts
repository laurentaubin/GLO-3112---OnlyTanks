import UploadProfilePictureRequest from "./UploadProfilePictureRequest";
import UploadProfilePictureRequestBody from "./UploadProfilePictureRequestBody";

class UploadProfilePictureRequestAssembler {
  assembleUploadProfilePictureRequestBody(request: UploadProfilePictureRequest): UploadProfilePictureRequestBody {
    return {
      ...request.body,
      file: request.file
    };
  }
}

export default UploadProfilePictureRequestAssembler;
