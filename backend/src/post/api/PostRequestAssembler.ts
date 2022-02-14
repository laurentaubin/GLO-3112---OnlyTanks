import PostRequestBody from "./PostRequestBody";
import PostRequest from "./PostRequest";

class PostRequestAssembler {
  public assemblePostRequestBody(request: PostRequest): PostRequestBody {
    return {
      ...request.body,
      hashtags: JSON.parse(request.body.hashtags),
      file: request.file
    };
  }
}

export default PostRequestAssembler;
