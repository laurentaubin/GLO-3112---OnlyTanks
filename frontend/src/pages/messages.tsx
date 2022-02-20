import type { NextPage } from "next";
import Head from "next/head";
import { UnderConstruction } from "../main/components/UnderConstruction";
import { Layout } from "../main/layout/Layout";
const Messages: NextPage = () => {
  return (
    <>
      <Head>
        <title>Messages • Onlytanks</title>
      </Head>
      <Layout>
        <UnderConstruction />
      </Layout>
    </>
  );
};

export default Messages;
