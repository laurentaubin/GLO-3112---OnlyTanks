import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import TabTitle from "../../search/TabTitle";

const SearchHashtags: NextPage = () => {
  const search = () => {
    console.log("search by hashtags");
  };

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.HASHTAGS} placeholder="Search posts by hashtags" search={search}></SearchPage>
      </Layout>
    </>
  );
};

export default SearchHashtags;
