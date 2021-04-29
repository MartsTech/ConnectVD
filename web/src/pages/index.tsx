import appInfo from "@service/appInfo";
import HomeTemplate from "@template/HomeTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { useIsNotAuth } from "@util/useIsNotAuth";
import { withUrqlClient } from "next-urql";
import Head from "next/head";

const Home = () => {
  useIsNotAuth();

  return (
    <>
      <Head>
        <title>{appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
