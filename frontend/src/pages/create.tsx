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
        <div className="md:bg-slate-100 h-screen md:items-center">
          <PostCreation />
        </div>
      </Layout>
    </>
  );
};

export default Create;
