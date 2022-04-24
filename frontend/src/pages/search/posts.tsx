import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import TabTitle from "../../search/TabTitle";
import SearchedPosts from "../../search/posts/components/SearchedPosts";
import { State } from "../../main/hooks/useAxios";
import LoadingPage from "../../main/components/LoadingPage";
import { useSearchPostsByCaption } from "../../search/posts/api/useSearchPostsByCaption";
import analyticsService, { AnalyticEvent } from "../../services/analytics";

const SearchPosts: NextPage = () => {
  const { posts, searchPosts, state } = useSearchPostsByCaption();

  const search = (caption: string) => {
    analyticsService.logEvent(AnalyticEvent.SEARCH_POST_BY_CAPTION);
    searchPosts(caption);
  };

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.POSTS} singleInputSearch={search} placeholder="Search posts by caption">
          {state === State.LOADING ? <LoadingPage /> : <SearchedPosts posts={posts} />}
        </SearchPage>
      </Layout>
    </>
  );
};

export default SearchPosts;
