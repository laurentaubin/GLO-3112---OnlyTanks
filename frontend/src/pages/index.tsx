import type { NextPage } from "next";
import Head from "next/head";
import { LandingPage } from "../authentication/LandingPage";
import { Layout } from "../main/layout/Layout";
import { MainFeed } from "../feed/MainFeed";
import { useAuth } from "../main/hooks/useAuth";

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>OnlyTanks</title>
      </Head>
      {isLoggedIn ? (
        <Layout>
          <MainFeed />
        </Layout>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default Home;
