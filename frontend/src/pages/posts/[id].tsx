import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../main/layout/Layout";
import PostPage from "../../post/PostPage";

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>OnlyTanks - Post</title>
      </Head>
      <Layout>
        <div className="h-screen md:items-center">
          <PostPage />
        </div>
      </Layout>
    </>
  );
};

export default Post;
