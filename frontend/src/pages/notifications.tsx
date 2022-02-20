import type { NextPage } from "next";
import Head from "next/head";
import { UnderConstruction } from "../main/components/UnderConstruction";
import { Layout } from "../main/layout/Layout";

const Notifications: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notifications • Onlytanks</title>
      </Head>
      <Layout>
        <UnderConstruction />
      </Layout>
    </>
  );
};

export default Notifications;
