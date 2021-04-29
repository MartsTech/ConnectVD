import appInfo from "@service/appInfo";
import HomeTemplate from "@template/HomeTemplate";
import { useIsNotAuth } from "@util/useIsNotAuth";
import Head from "next/head";

const Home = () => {
  useIsNotAuth();

  return (
    <div>
      <Head>
        <title>{appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </div>
  );
};

export default Home;
