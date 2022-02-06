import PostBody from "./PostBody";
import PostRequest from "./PostRequest";

class PostRequestAssembler {
  public postRequestToPostApi(request: PostRequest): PostBody {
    return {
      ...request.body,
      hashtags: JSON.parse(request.body.hashtags),
      file: request.file
    };
  }
}

export default PostRequestAssembler;
