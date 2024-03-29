import { auth } from "@config/firebase";
import DashProfile from "@element/Profile";
import DefaultLayout from "@layout/HeaderLayout";
import DashFriends from "@section/DashFriends";
import Header from "@section/Header";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import {
  useChangeStatusMutation,
  useFriendsQuery,
  useMeQuery,
  User,
  useUnfriendMutation,
} from "generated/graphql";
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

  const [, changeStatus] = useChangeStatusMutation();
  const [, unfriend] = useUnfriendMutation();

  const setNewStatus = async (status: string) => {
    await changeStatus({
      uid: user?.uid as string,
      status,
    });
  };

  const [sidebar, setSidebar] = useState(false);

  const unfriendUser = (email: string) => {
    unfriend({ uid: user?.uid as string, email });
  };

  return (
    <NotificationsOn>
      <DefaultLayout
        Header={
          <Header
            data={meData.data?.me as User}
            onMenu={() => setSidebar(!sidebar)}
            home="/dash"
            onStatus={setNewStatus}
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
            <DashFriends
              onNoFriends={onNoFriends}
              data={friendsData.data}
              onUnfriend={unfriendUser}
            />
          }
          Profile={<DashProfile data={meData.data?.me as User} />}
          useSidebar={sidebar}
        />
      </DefaultLayout>
    </NotificationsOn>
  );
};

export default DesktopLayout;
