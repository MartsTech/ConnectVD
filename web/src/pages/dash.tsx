import { auth } from "@config/firebase";
import DashProfile from "@element/Profile";
import DefaultLayout from "@layout/HeaderLayout";
import DashFriends from "@section/DashFriends";
import Header from "@section/Header";
import appInfo from "@service/appInfo";
import { createUrqlClient } from "@util/createUrqlClient";
import { MeQuery, useCreateRoomMutation, useMeQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import DashBoard from "@section/DashBoard";
import DashTemplate from "@template/DashTemplate";
import IsAuth from "@layout/IsAuth";

const DashPage = () => {
  const [user, loading] = useAuthState(auth);

  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [, createRoom] = useCreateRoomMutation();

  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();

  const startMeeting = async () => {
    const { data } = await createRoom({ uid: user?.uid as string });
    router.push(`/room/${data?.createRoom}`);
  };

  const friendsData: MeQuery[] = [];
  for (let i = 0; i < 20; ++i) {
    if (typeof meData.data !== "undefined") {
      friendsData.push(meData.data);
    }
  }

  return (
    <IsAuth>
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
          Board={<DashBoard startMeeting={startMeeting} />}
          Friends={<DashFriends data={friendsData} />}
          Profile={<DashProfile data={meData.data} />}
          useSidebar={sidebar}
        />
      </DefaultLayout>
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(DashPage);
