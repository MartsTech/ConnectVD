import DashProfile from "@section/DashProfile";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { useIsAuth } from "@util/useIsAuth";
import { auth } from "firebaseConfig";
import { useMeQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

const Dash = () => {
  useIsAuth();

  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  return (
    <>
      <Head>
        <title>Dashboard | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashTemplate Profile={<DashProfile data={meData.data} />} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Dash);
