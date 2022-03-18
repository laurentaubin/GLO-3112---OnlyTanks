import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import { State } from "../main/hooks/useAxios";
import { Layout } from "../main/layout/Layout";
import { useAuthorPosts } from "../profile/api/useAuthorPosts";
import { useUser } from "../main/api/user/useUser";
import UserProfile from "../profile/UserProfile";
import NotFoundPage from "../main/components/NotFoundPage";
import Head from "next/head";

const User: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user, state } = useUser(username as string);
  const { posts } = useAuthorPosts(username as string);

  return (
    <>
      <Head>
        <title>{username} • Onlytanks</title>
      </Head>
      <Layout>
        {state === State.LOADING ? (
          <SpinnerIcon size={20} />
        ) : (
          <> {user ? <UserProfile posts={posts} userProp={user} /> : <NotFoundPage />} </>
        )}
      </Layout>
    </>
  );
};

export default User;
