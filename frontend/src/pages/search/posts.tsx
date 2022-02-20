import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import TabTitle from "../../search/TabTitle";

const SearchPosts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.POSTS}></SearchPage>
      </Layout>
    </>
  );
};

export default SearchPosts;
