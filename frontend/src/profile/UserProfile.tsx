import React, { useState } from "react";
import UserInformation from "./components/UserInformation";
import User from "../main/domain/user/User";
import Post from "../main/domain/post/Post";
import UserPosts from "./components/UserPosts";

interface Props {
  userProp: User;
  posts: Post[];
}

const UserProfile = ({ userProp, posts }: Props) => {
  const [user, setUser] = useState<User>(userProp);

  const onUserUpdated = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="ml-10">
      <UserInformation user={user} onUserUpdated={onUserUpdated} />
      <hr className="mt-5" />
      <UserPosts posts={posts ? posts : []} />
    </div>
  );
};

export default UserProfile;
