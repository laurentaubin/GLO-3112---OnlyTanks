class User {
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;

  constructor(username: string, firstName: string, lastName: string, email: string, phoneNumber: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

export default User;
