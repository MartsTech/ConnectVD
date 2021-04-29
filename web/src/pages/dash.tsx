import appInfo from "@service/appInfo";
import DashTemplate from "@template/DashTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { useIsAuth } from "@util/useIsAuth";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import Button from "@element/Button";
import { auth } from "firebaseConfig";

const Dash = () => {
  useIsAuth();

  return (
    <div>
      <Head>
        <title>{appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button title="Sign Out" onClick={() => auth.signOut()} />
      <DashTemplate />
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Dash);
