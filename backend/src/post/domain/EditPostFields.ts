import UserTag from "./UserTag";

interface EditPostFields {
  caption: string;
  hashtags: string[];
  userTags: UserTag[];
}

export default EditPostFields;
