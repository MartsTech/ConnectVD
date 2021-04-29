import Button from "@element/Button";
import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { useIsAuth } from "@util/useIsAuth";
import { auth } from "firebaseConfig";
import DefaultWrapper from "layouts/DefaultWrapper";
import { withUrqlClient } from "next-urql";
import Head from "next/head";

const Dash = () => {
  useIsAuth();

  return (
    <DefaultWrapper>
      <Head>
        <title>Dashboard | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashTemplate />
      {/* <Button title="Sign Out" onClick={() => auth.signOut()} /> */}
    </DefaultWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Dash);
