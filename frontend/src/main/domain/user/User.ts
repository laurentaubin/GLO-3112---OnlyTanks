class User {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public imageUrl?: string;
  public createdAt?: number;
  public totalNumberOfLikes?: number;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    imageUrl?: string,
    createdAt?: number,
    totalNumberOfLikes?: number
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.totalNumberOfLikes = totalNumberOfLikes;
  }
}

export default User;
