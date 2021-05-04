import { auth } from "@config/firebase";
import DashProfile from "@element/Profile";
import HeaderLayout from "@layout/HeaderLayout";
import IsAuth from "@layout/IsAuth";
import DashFriends from "@section/DashFriends";
import Emails from "@section/Emails";
import Header from "@section/Header";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import {
  useFriendsQuery,
  useMeQuery,
  User
} from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const EmailsPage = () => {
  const [user, loading] = useAuthState(auth);

  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });
  const [friendsData] = useFriendsQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [sidebar, setSidebar] = useState(false);

  return (
    <IsAuth>
      <HeaderLayout
        Header={
          <Header
            data={meData.data}
            onMenu={() => setSidebar(!sidebar)}
            home="/dash"
          />
        }
      >
        <Head>
          <title>Emails | {appInfo.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DashTemplate
          Main={<Emails />}
          Friends={<DashFriends data={friendsData.data} />}
          Profile={<DashProfile data={meData.data?.me as User} />}
          useSidebar={sidebar}
        />
      </HeaderLayout>
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(EmailsPage);
