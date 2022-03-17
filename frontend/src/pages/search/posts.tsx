import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import TabTitle from "../../search/TabTitle";
import SearchedPosts from "../../search/posts/components/SearchedPosts";
import { State } from "../../main/hooks/useAxios";
import LoadingPage from "../../main/components/LoadingPage";
import { useSearchPosts } from "../../search/posts/api/useSearchPosts";

const SearchPosts: NextPage = () => {
  const { posts, searchPosts, state } = useSearchPosts();

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.POSTS} singleInputSearch={searchPosts} placeholder="Search posts by caption">
          {state === State.LOADING ? <LoadingPage /> : <SearchedPosts posts={posts} />}
        </SearchPage>
      </Layout>
    </>
  );
};

export default SearchPosts;
