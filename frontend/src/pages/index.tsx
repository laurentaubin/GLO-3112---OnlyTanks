import type { NextPage } from "next";
import Head from "next/head";
import { LandingPage } from "../authentication/LandingPage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OnlyTanks</title>
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;
