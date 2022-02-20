import User from "../../user/domain/User";

export default class UserBuilder {
  private readonly user: User;

  constructor() {
    this.user = {
      username: "frankTheTank",
      firstName: "Franky",
      lastName: "Boy",
      email: "franky@email.com",
      phoneNumber: "418-123-4567",
      imageUrl: "allo.com",
      createdAt: 1645387217110
    };
  }

  withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  build(): User {
    return this.user;
  }
}
