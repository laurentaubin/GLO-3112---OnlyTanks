import type { NextPage } from "next";
import Head from "next/head";
import { useSearchUsers } from "../../search/api/useSearchUsers";
import { SpinnerIcon } from "../../main/components/SpinnerIcon";
import { State } from "../../main/hooks/useAxios";
import { Layout } from "../../main/layout/Layout";
import { UsersList } from "../../search/components/UsersList";

const SearchUsers: NextPage = () => {
  const { searchReturnUsers, state } = useSearchUsers();

  return (
    <>
      <Head>
        <title>Search • Onlytanks</title>
      </Head>
      <Layout>{state === State.LOADING ? <SpinnerIcon size={20} /> : <UsersList users={searchReturnUsers} />}</Layout>
    </>
  );
};

export default SearchUsers;
