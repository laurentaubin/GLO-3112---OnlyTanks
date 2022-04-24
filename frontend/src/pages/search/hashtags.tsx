import type { NextPage } from "next";
import Head from "next/head";
import LoadingPage from "../../main/components/LoadingPage";
import { State } from "../../main/hooks/useAxios";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import { useSearchPostsByHashtags } from "../../search/posts/api/useSearchPostsByHashtags";
import SearchedPosts from "../../search/posts/components/SearchedPosts";
import TabTitle from "../../search/TabTitle";
import analyticsService, { AnalyticEvent } from "../../services/analytics";

const SearchHashtags: NextPage = () => {
  const { posts, searchPostsByHashtags, state } = useSearchPostsByHashtags();

  const search = (hashtags: string[]) => {
    analyticsService.logEvent(AnalyticEvent.SEARCH_POST_BY_HASHTAGS);
    searchPostsByHashtags(hashtags);
  };

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.HASHTAGS} multipleInputsSearch={search} placeholder="Press enter to confirm Hashtag">
          {state === State.LOADING ? <LoadingPage /> : <SearchedPosts posts={posts} />}
        </SearchPage>
      </Layout>
    </>
  );
};

export default SearchHashtags;
