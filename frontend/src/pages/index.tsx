import type { NextPage } from "next";
import Head from "next/head";
import { LandingPage } from "../components/LandingPage";

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
