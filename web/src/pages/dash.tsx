import DashProfile from "@element/Profile";
import DefaultLayout from "@layout/HeaderLayout";
import DashFriends from "@section/DashFriends";
import Header from "@section/Header";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { useIsAuth } from "@util/useIsAuth";
import { auth } from "firebaseConfig";
import { MeQuery, useMeQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Dash = () => {
  useIsAuth();

  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [sidebar, setSidebar] = useState(false);

  const friendsData: MeQuery[] = [];

  for (let i = 0; i < 20; ++i) {
    if (typeof meData.data !== "undefined") {
      friendsData.push(meData.data);
    }
  }

  return (
    <DefaultLayout
      Header={
        <Header
          data={meData.data}
          onMenu={() => setSidebar(!sidebar)}
          home="/dash"
        />
      }
    >
      <Head>
        <title>Dashboard | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashTemplate
        useSidebar={sidebar}
        Friends={<DashFriends data={friendsData} />}
        Profile={<DashProfile data={meData.data} />}
      />
    </DefaultLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Dash);
