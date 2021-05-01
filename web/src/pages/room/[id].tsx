import { auth } from "@config/firebase";
import IsAuth from "@layout/IsAuth";
import RoomChat from "@section/RoomChat";
import appInfo from "@service/appInfo";
import RoomTemplate from "@template/RoomTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { MeQuery, useMeQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

interface RoomProps {}

const Room: React.FC<RoomProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const messages: MeQuery[] = [];
  for (let i = 0; i < 10; ++i) {
    messages.push(meData.data as MeQuery);
  }

  return (
    <IsAuth>
      <Head>
        <title>Room | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomTemplate Chat={<RoomChat messages={messages} />} />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(Room);
