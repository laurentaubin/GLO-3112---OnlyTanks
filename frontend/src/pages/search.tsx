import type { NextPage } from "next";
import Head from "next/head";
import { useSearchUsers } from "../search/api/useSearchUsers";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import { State } from "../main/hooks/useAxios";
import { Layout } from "../main/layout/Layout";
import { UsersList } from "../search/components/UsersList";

const Search: NextPage = () => {
  const { searchReturnUsers, state, error } = useSearchUsers();

  return (
    <>
      <Head>
        <title>OnlyTanks - Search</title>
      </Head>
      <Layout>{state === State.LOADING ? <SpinnerIcon size={20} /> : <UsersList users={searchReturnUsers} />}</Layout>;
    </>
  );
};

export default Search;
