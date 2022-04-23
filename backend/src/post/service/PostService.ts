import PostRequestBody from "../api/PostRequestBody";
import Post from "../domain/Post";
import PostRepository from "../domain/PostRepository";
import PostFactory from "./PostFactory";
import FileAssembler from "../../storage/service/FileAssembler";
import FileRepository from "../../storage/domain/FileRepository";
import Pagination from "../../utils/pagination/Pagination";
import PostAssembler from "./PostAssembler";
import EditPostFieldsRequest from "../api/EditPostFieldsRequest";
import EditPostFields from "../domain/EditPostFields";
import EditPostFieldsAssembler from "./EditPostFieldsAssembler";
import SessionRepository from "../../authentication/domain/SessionRepository";
import Token from "../../authentication/domain/Token";
import UserPreviewService from "../../user/service/UserPreviewService";
import UserPreview from "../../user/domain/UserPreview";
import NotificationService from "../../notifications/service/NotificationService";
import NotificationType from "../../notifications/domain/NotificationType";
import Comment from "../domain/Comment";
import CommentFactory from "../domain/CommentFactory";
import PostCommentRequest from "../api/PostCommentRequest";
import PostResponse from "../api/PostResponse";
import CommentResponse from "../api/CommentResponse";
import CommentService from "../../user/service/CommentService";
import NotificationFactory from "src/notifications/service/NotificationFactory";
import PostNotification from "src/notifications/domain/PostNotification";

export default class PostService {
  constructor(
    private commentFactory: CommentFactory,
    private postFactory: PostFactory,
    private postAssembler: PostAssembler,
    private postRepository: PostRepository,
    private fileRepository: FileRepository,
    private fileAssembler: FileAssembler,
    private notificationService: NotificationService,
    private notificationFactory: NotificationFactory,
    private editPostFieldsAssembler: EditPostFieldsAssembler,
    private sessionRepository: SessionRepository,
    private userPreviewService: UserPreviewService,
    private commentService: CommentService
  ) {}

  public async addPost(postRequest: PostRequestBody) {
    const file = this.fileAssembler.assembleFile(postRequest.file);
    const storageReport = await this.fileRepository.storeImage(file, false, true);
    const post: Post = this.postFactory.create(postRequest, storageReport.imageUrl);

    await this.postRepository.save(post);
  }

  public async getAuthorPosts(token: string, author: string, pagination: Pagination): Promise<PostResponse[]> {
    const user = await this.userPreviewService.getUserPreview(author);
    const posts = await this.getPostsByUsername(author, pagination);
    const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });

    const postResponses = posts.map((post) => this.postAssembler.assemblePostResponse(post, user, requesterUsername, true));

    return Promise.all(postResponses);
  }

  public async getPosts(token: string, pagination: Pagination): Promise<Awaited<PostResponse>[]> {
    const posts = await this.postRepository.find(pagination);

    const postResponse = posts.map(async (post) => {
      const user = await this.userPreviewService.getUserPreview(post.author);
      const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });
      return this.postAssembler.assemblePostResponse(post, user, requesterUsername);
    });

    return Promise.all(postResponse);
  }

  public async deletePost(id: string) {
    await this.postRepository.delete(id);
  }

  public async getPost(token: string, id: string): Promise<PostResponse> {
    const post = await this.postRepository.findById(id);
    const user = await this.userPreviewService.getUserPreview(post.author);
    const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });
    return this.postAssembler.assemblePostResponse(post, user, requesterUsername);
  }

  public async editPost(token: string, id: string, editPostFieldsRequest: EditPostFieldsRequest): Promise<PostResponse> {
    const postToUpdate: Post = await this.postRepository.findById(id);
    const editPostFields: EditPostFields = this.editPostFieldsAssembler.assembleEditPostFields(editPostFieldsRequest);
    const updatedPost: Post = { ...postToUpdate, ...editPostFields };
    await this.postRepository.update(id, updatedPost);

    const user = await this.userPreviewService.getUserPreview(updatedPost.author);
    const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });

    return this.postAssembler.assemblePostResponse(updatedPost, user, requesterUsername);
  }

  public async likePost(token: string, postId: string): Promise<void> {
    const requester = await this.findRequester(token);
    const postToUpdate = await this.postRepository.findById(postId);
    const user = postToUpdate.likes?.find((username) => username === requester.username);
    if (!user) {
      const updatedLikes = postToUpdate.likes ? [...postToUpdate.likes, requester.username] : [requester.username];
      const updatedPost = { ...postToUpdate, likes: updatedLikes };
      await this.postRepository.update(postId, updatedPost);
      const postNotification: PostNotification = this.notificationFactory.create(
        postId,
        updatedPost.author,
        requester.username,
        NotificationType.POST_LIKE
      );
      this.notificationService.sendPostNotification(postNotification);
      await this.incrementAuthorTotalNumberOfLikes(await this.userPreviewService.getUserPreview(updatedPost.author));
    }
  }

  public async unlikePost(token: string, postId: string): Promise<void> {
    const requester = await this.findRequester(token);
    const postToUpdate = await this.postRepository.findById(postId);
    const user = postToUpdate.likes?.find((username) => username === requester.username);
    if (user) {
      const updatedLikes = postToUpdate.likes?.filter((username) => username !== requester.username);
      const updatedPost = { ...postToUpdate, likes: updatedLikes };
      await this.postRepository.update(postId, updatedPost);
      await this.decrementAuthorTotalNumberOfLikes(await this.userPreviewService.getUserPreview(updatedPost.author));
    }
  }

  public async commentPost(token: string, postId: string, postCommentRequest: PostCommentRequest): Promise<PostResponse> {
    const requester = await this.findRequester(token);
    const postToUpdate = await this.postRepository.findById(postId);
    const postAuthor = await this.userPreviewService.getUserPreview(postToUpdate.author);
    const comment: Comment = this.commentFactory.create(requester.username, postCommentRequest);

    const updatedComments = [...postToUpdate.comments, comment];
    const updatedPost = await this.postRepository.update(postId, { ...postToUpdate, comments: updatedComments });
    const postNotification: PostNotification = this.notificationFactory.create(
      postId,
      updatedPost.author,
      requester.username,
      NotificationType.POST_COMMENT
    );
    this.notificationService.sendPostNotification(postNotification);

    return this.postAssembler.assemblePostResponse(updatedPost, postAuthor, requester.username);
  }

  public async findPostsByCaption(token: string, caption: string, pagination: Pagination): Promise<PostResponse[]> {
    const posts = await this.postRepository.findByCaption(caption, pagination);
    const postsResponse: PostResponse[] = [];
    for (const post of posts) {
      const user = await this.userPreviewService.getUserPreview(post.author);
      const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });
      const postResponse = await this.postAssembler.assemblePostResponse(post, user, requesterUsername);
      postsResponse.push(postResponse);
    }
    return postsResponse;
  }

  public async findPostsByHashtags(token: string, hashtags: string[], pagination: Pagination): Promise<PostResponse[]> {
    const posts = await this.postRepository.findByHashtags(hashtags, pagination);
    const postsResponse: PostResponse[] = [];

    for (const post of posts) {
      const user = await this.userPreviewService.getUserPreview(post.author);
      const requesterUsername = await this.sessionRepository.findUsernameWithToken({ value: token });
      const postResponse = await this.postAssembler.assemblePostResponse(post, user, requesterUsername);
      postsResponse.push(postResponse);
    }
    return postsResponse;
  }

  public async getPostLikes(id: string): Promise<UserPreview[]> {
    const post = await this.postRepository.findById(id);
    return this.userPreviewService.getUserPreviews(post.likes);
  }

  public async getPostComments(id: string): Promise<CommentResponse[]> {
    const post = await this.postRepository.findById(id);
    return this.commentService.getCommentsAuthorPreviews(post.comments);
  }

  private findRequester = async (token: string): Promise<UserPreview> => {
    const sessionToken: Token = { value: token };
    const requesterUsername = await this.sessionRepository.findUsernameWithToken(sessionToken);
    return this.userPreviewService.getUserPreview(requesterUsername);
  };

  private incrementAuthorTotalNumberOfLikes = async (userPreview: UserPreview | undefined): Promise<void> => {
    if (userPreview) {
      if (userPreview.totalNumberOfLikes) {
        await this.userPreviewService.updateTotalNumberOfLikes(userPreview.username, userPreview.totalNumberOfLikes + 1);
      } else {
        await this.computeAndUpdateUserTotalNumberOfLikes(userPreview.username);
      }
    }
  };

  private decrementAuthorTotalNumberOfLikes = async (userPreview: UserPreview | undefined): Promise<void> => {
    if (userPreview) {
      if (userPreview.totalNumberOfLikes) {
        await this.userPreviewService.updateTotalNumberOfLikes(userPreview.username, userPreview.totalNumberOfLikes - 1);
      } else {
        await this.computeAndUpdateUserTotalNumberOfLikes(userPreview.username);
      }
    }
  };

  private getPostsByUsername = async (username: string, pagination: Pagination): Promise<Post[]> => {
    return await this.postRepository.findByAuthor(username, pagination);
  };

  private computeAndUpdateUserTotalNumberOfLikes = async (username: string): Promise<void> => {
    const totalNumberOfLikes = await this.computeTotalNumberOfLikes(username);
    await this.userPreviewService.updateTotalNumberOfLikes(username, totalNumberOfLikes);
  };

  private computeTotalNumberOfLikes = async (username: string): Promise<number> => {
    let totalNumberOfLikes = 0;
    const authorPosts = await this.getPostsByUsername(username, {});
    authorPosts.forEach((post) => {
      totalNumberOfLikes += post.likes.length;
    });
    return totalNumberOfLikes;
  };
}
