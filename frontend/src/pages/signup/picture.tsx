import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ChooseProfilePicture from "../../authentication/components/signup/ChooseProfilePicture";

const Picture: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const username = query.username as string;

  return (
    <>
      <Head>
        <title>Signup • Onlytanks</title>
      </Head>
      <div className="md:bg-slate-100 h-screen w-screen flex justify-center text-center md:items-center">
        <ChooseProfilePicture username={username} />
      </div>
    </>
  );
};

export default Picture;
