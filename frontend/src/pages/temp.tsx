import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../layout/Layout";
import {MainFeed} from "../feed/MainFeed";

// TODO This page will be included in the home page and conditionally rendered if the user is logged it.
// For now we placed it in a separate page
const Temp: NextPage = () => {
  return (
    <div>
      <div>
        <Head>
          <title>OnlyTanks</title>
        </Head>
      </div>
      <div>
        <Layout>
          <MainFeed />
        </Layout>
      </div>
    </div>
  );
};

export default Temp;
