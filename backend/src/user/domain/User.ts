interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  createdAt: number;
  totalNumberOfLikes?: number;
}

export default User;
