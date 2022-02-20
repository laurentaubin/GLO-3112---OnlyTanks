import type { NextPage } from "next";
import PostCreation from "../post/PostCreation";
import Head from "next/head";
import { Layout } from "../main/layout/Layout";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>New post • Onlytanks</title>
      </Head>
      <Layout>
        <div className="h-full md:items-center">
          <PostCreation />
        </div>
      </Layout>
    </>
  );
};

export default Create;
