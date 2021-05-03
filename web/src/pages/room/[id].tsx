import IsAuth from "@layout/IsAuth";
import Room from "@section/Room";
import RoomChat from "@section/RoomChat";
import RoomControls from "@section/RoomControls";
import appInfo from "@service/appInfo";
import RoomTemplate from "@template/RoomTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { messageType } from "@type/messageType";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import { useMeQuery } from "generated/graphql";

interface RoomPageProps {}

const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [chat, setChat] = useState(false);
  const [leave, setLeave] = useState(false);
  const [screen, setScreen] = useState(false);
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(true);

  const [messages, setMessages] = useState<messageType[]>([]);

  return (
    <IsAuth>
      <Head>
        <title>Room | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomTemplate
        Room={
          <Room
            leave={leave}
            screen={screen}
            setScreen={setScreen}
            video={video}
            audio={audio}
            setMessages={setMessages}
          />
        }
        Controls={
          <RoomControls
            onChat={() => setChat(!chat)}
            onLeave={() => setLeave(true)}
            onScreen={() => setScreen(!screen)}
            onVideo={() => setVideo(!video)}
            video={video}
            onAudio={() => setAudio(!audio)}
            audio={audio}
          />
        }
        Chat={<RoomChat messages={messages} />}
        showChat={chat}
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(RoomPage);
