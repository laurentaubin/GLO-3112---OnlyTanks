class User {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public imageUrl?: string;

  constructor(username: string, firstName: string, lastName: string, email: string, phoneNumber: string, imageUrl?: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.imageUrl = imageUrl;
  }
}

export default User;
