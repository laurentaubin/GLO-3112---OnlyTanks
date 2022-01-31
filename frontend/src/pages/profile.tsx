import type { NextPage } from "next";
import Head from "next/head";
import UserProfile from "../profile/UserInformation";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>OnlyTanks - Profile</title>
      </Head>
      <div className="md:bg-slate-100 h-screen w-screen flex justify-center text-center md:items-center">
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
