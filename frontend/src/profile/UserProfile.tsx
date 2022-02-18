import React from "react";
import UserInformation from "./components/UserInformation";
import User from "../main/domain/User";
import Post from "../main/domain/Post";
import UserPosts from "./components/UserPosts";

interface Props {
  user: User | undefined;
  posts: Post[];
}

const UserProfile = ({ user, posts }: Props) => {
  return (
    <div className="ml-10">
      <UserInformation user={user as User} />
      <hr className="mt-5" />
      <UserPosts posts={posts ? posts : []} />
    </div>
  );
};

export default UserProfile;
