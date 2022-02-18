import React from "react";
import UserInformation from "./components/UserInformation";
import User from "../main/domain/User";
import Post from "../main/domain/Post";
import AuthorPosts from "./components/AuthorPosts";

interface Props {
  user: User | undefined;
  posts: Post[];
}

const UserProfile = ({ user, posts }: Props) => {
  return (
    <>
      <UserInformation user={user as User} />
      <AuthorPosts posts={posts ? posts : []} />
    </>
  );
};

export default UserProfile;
