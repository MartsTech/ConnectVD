import IsAuth from "@layout/IsAuth";
import appInfo from "@service/appInfo";
import RoomTemplate from "@template/RoomTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Head from "next/head";

interface MeetingProps {}

const Meeting: React.FC<MeetingProps> = ({}) => {
  return (
    <IsAuth>
      <Head>
        <title>Room | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomTemplate />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(Meeting);
