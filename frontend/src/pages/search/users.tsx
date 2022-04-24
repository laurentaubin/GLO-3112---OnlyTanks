import type { NextPage } from "next";
import Head from "next/head";
import { SpinnerIcon } from "../../main/components/SpinnerIcon";
import { State } from "../../main/hooks/useAxios";
import { Layout } from "../../main/layout/Layout";
import { SearchPage } from "../../search/components/SearchPage";
import TabTitle from "../../search/TabTitle";
import { useSearchUsers } from "../../search/users/api/useSearchUsers";
import { UsersList } from "../../search/users/components/UsersList";
import analyticsService, { AnalyticEvent } from "../../services/analytics";

const SearchUsers: NextPage = () => {
  const { users, searchUsers, state } = useSearchUsers();

  const search = (partialUsername: string) => {
    analyticsService.logEvent(AnalyticEvent.SEARCH_USER);
    searchUsers(partialUsername);
  };

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>
        <SearchPage currentTab={TabTitle.USERS} singleInputSearch={search} placeholder="Search users by username">
          {state === State.LOADING ? <SpinnerIcon size={20} /> : <UsersList users={users} />}
        </SearchPage>
      </Layout>
    </>
  );
};

export default SearchUsers;
