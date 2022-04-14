import { GooglePhotoResponse } from "../GooglePhotoResponse";
import { GooglePhoto } from "../GooglePhoto";

class GooglePhotoAssembler {
  assemble(googlePhotoResponse: GooglePhotoResponse): GooglePhoto {
    return {
      src: googlePhotoResponse.baseUrl,
      width: googlePhotoResponse.mediaMetadata.width,
      height: googlePhotoResponse.mediaMetadata.height,
      type: googlePhotoResponse.mimeType,
      filename: googlePhotoResponse.filename
    };
  }
}

export default new GooglePhotoAssembler();
