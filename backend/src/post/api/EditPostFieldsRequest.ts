import UserTagsDto from "./dto/UserTagsDto";

interface EditPostFieldsRequest {
  caption: string;
  hashtags: string[];
  userTags: UserTagsDto[];
}

export default EditPostFieldsRequest;
