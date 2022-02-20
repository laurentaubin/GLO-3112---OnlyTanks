import UserTagsDto from "./UserTagsDto";

interface EditPostFieldsRequest {
  caption: string;
  hashtags: string[];
  userTags: UserTagsDto[];
}

export default EditPostFieldsRequest;
