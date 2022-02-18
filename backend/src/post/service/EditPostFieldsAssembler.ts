import EditPostFieldsRequest from "../api/EditPostFieldsRequest";
import EditPostFields from "../domain/EditPostFields";

class EditPostFieldsAssembler {
  public assembleEditPostFields(editPostFieldsRequest: EditPostFieldsRequest): EditPostFields {
    return {
      caption: editPostFieldsRequest.caption,
      hashtags: editPostFieldsRequest.hashtags
    };
  }
}

export default EditPostFieldsAssembler;
