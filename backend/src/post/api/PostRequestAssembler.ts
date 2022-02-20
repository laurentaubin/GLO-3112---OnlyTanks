import PostRequestBody from "./PostRequestBody";
import PostRequest from "./PostRequest";

class PostRequestAssembler {
  public assemblePostRequestBody(request: PostRequest): PostRequestBody {
    return {
      ...request.body,
      hashtags: JSON.parse(request.body.hashtags),
      userTags: JSON.parse(request.body.userTags),
      file: request.file
    };
  }
}

export default PostRequestAssembler;
