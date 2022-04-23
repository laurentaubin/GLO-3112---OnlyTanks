import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../main/layout/Layout";
import { useNotifications } from "../notifications/api/useNotifications";
import NotificationList from "../notifications/components/NotificationList";

const Notifications: NextPage = () => {
  const { notifications } = useNotifications();

  return (
    <>
      <Head>
        <title>Notifications • Onlytanks</title>
      </Head>
      <Layout>
        <NotificationList notifications={notifications ?? []} />
      </Layout>
    </>
  );
};

export default Notifications;
