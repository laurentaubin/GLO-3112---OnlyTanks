import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SpinnerIcon } from "../main/components/SpinnerIcon";
import { State } from "../main/hooks/useAxios";
import { Layout } from "../main/layout/Layout";
import { useUser } from "../profile/api/useUser";
import UserProfile from "../profile/UserProfile";

const User: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user, state } = useUser(username as string);

  return <Layout>{state === State.LOADING ? <SpinnerIcon size={20} /> : <UserProfile user={user} />}</Layout>;
};

export default User;
