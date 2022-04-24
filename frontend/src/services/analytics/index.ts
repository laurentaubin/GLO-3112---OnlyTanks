import FirebaseAnalyticsClient from "./FirebaseAnalyticsClient";

export enum AnalyticEvent {
  CREATE_POST = "CreatePost",
  SEARCH_USER = "SearchUser",
  SEARCH_POST_BY_CAPTION = "SearchPostByCaption",
  SEARCH_POST_BY_HASHTAGS = "SearchPostByHashtags",
  SELECT_IMAGE_FROM_GOOGLE_IMAGE = "SelectImageFromGoogleImage",
  DELETE_POST = "DeletePost",
  COMMENT_POST = "CommentPost",
  LIKE_POST = "LikePost",
  SEE_POST_LIKES = "SeePostLikes",
  UNLIKE_POST = "UnlikePost",
  NAVIGATE_TO_POST_PAGE = "NavigateToPostPage",
  SIGN_UP = "SignUp",
  LOGIN_WITH_GOOGLE = "LoginWithGoogle"
}

const analyticsService = new FirebaseAnalyticsClient();

export default analyticsService;
