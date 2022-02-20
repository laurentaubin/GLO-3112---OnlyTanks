import type { NextPage } from "next";
import Head from "next/head";
import { SignUpMenu } from "../../authentication/components/signup/SignUpMenu";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signup • Onlytanks</title>
      </Head>
      <div className="md:bg-slate-100 h-screen w-screen flex justify-center text-center md:items-center">
        <SignUpMenu />
      </div>
    </>
  );
};

export default Signup;
