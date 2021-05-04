import { auth } from "@config/firebase";
import DashProfile from "@element/Profile";
import DefaultLayout from "@layout/HeaderLayout";
import DashFriends from "@section/DashFriends";
import Header from "@section/Header";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { useFriendsQuery, useMeQuery, User } from "generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NotificationsOn from "./NotificationsOn";

interface DesktopLayoutProps {
  title?: string;
  onNoFriends?: () => void;
  Main: JSX.Element;
}

const DesktopLayout: NextPage<DesktopLayoutProps> = ({
  title,
  Main,
  onNoFriends,
}) => {
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
    <NotificationsOn>
      <DefaultLayout
        Header={
          <Header
            data={meData.data?.me as User}
            onMenu={() => setSidebar(!sidebar)}
            home="/dash"
          />
        }
      >
        <Head>
          <title>{title ? `${title} | ${appInfo.title}` : `${title}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DashTemplate
          Main={Main}
          Friends={
            <DashFriends onNoFriends={onNoFriends} data={friendsData.data} />
          }
          Profile={<DashProfile data={meData.data?.me as User} />}
          useSidebar={sidebar}
        />
      </DefaultLayout>
    </NotificationsOn>
  );
};

export default DesktopLayout;
