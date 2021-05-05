import IsNotAuth from "@layout/IsNotAuth";
import appInfo from "@service/appInfo";
import HomeTemplate from "@template/HomeTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Head from "next/head";

const Home = () => {
  return (
    <IsNotAuth>
      <Head>
        <title>{appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </IsNotAuth>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
