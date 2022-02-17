export default class PostNotFoundException extends Error {
  constructor() {
    super("Post not found");
  }
}
