import type { NextPage } from "next";
import PostCreation from "../post/PostCreation";
import Head from "next/head";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>OnlyTanks - Profile</title>
      </Head>
      <div className="md:bg-slate-100 h-screen w-screen flex justify-center text-center md:items-center">
        <PostCreation />
      </div>
    </>
  );
};

export default Create;
