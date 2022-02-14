import FileRequest from "../types/FileRequest";
import File from "../domain/File";

class FileAssembler {
  public assembleFile(fileRequest: FileRequest): File {
    return {
      ...fileRequest,
      fieldName: fileRequest.fieldname,
      originalName: fileRequest.originalname,
      mimeType: fileRequest.mimetype,
      fileName: fileRequest.filename
    };
  }
}

export default FileAssembler;
