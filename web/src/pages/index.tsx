import HomeTemplate from "@template/HomeTemplate";
import Head from "next/head";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>ConnectVD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate />
    </div>
  );
};

export default Home;
