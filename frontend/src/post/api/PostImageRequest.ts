interface UserTag {
  username: string;
  position: number[];
}

export interface PostImageContent {
  image: File;
  author: string;
  caption: string;
  hashtags: string[];
  userTags: UserTag[];
}
