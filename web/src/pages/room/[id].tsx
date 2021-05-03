import IsAuth from "@layout/IsAuth";
import Room from "@section/Room";
import RoomChat from "@section/RoomChat";
import RoomControls from "@section/RoomControls";
import appInfo from "@service/appInfo";
import RoomTemplate from "@template/RoomTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import { useMeQuery } from "generated/graphql";
import { io, Socket } from "socket.io-client";
import { messageType } from "@type/messageType";

interface RoomPageProps {}

const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const socketRef = useRef<Socket>();

  const [chat, setChat] = useState(false);
  const [leave, setLeave] = useState(false);
  const [screen, setScreen] = useState(false);
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(true);

  const [messages, setMessages] = useState<messageType[]>([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:8000");

    socketRef.current?.on("chat message", (message: messageType) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <IsAuth>
      <Head>
        <title>Room | {appInfo.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomTemplate
        Room={
          <Room
            socketRef={socketRef}
            leave={leave}
            screen={screen}
            setScreen={setScreen}
            video={video}
            audio={audio}
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
        Chat={
          <RoomChat
            socketRef={socketRef}
            messages={messages}
            messageData={{
              photoURL: meData.data?.me?.photoUrl as string,
              status: meData.data?.me?.status as string,
            }}
          />
        }
        showChat={chat}
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(RoomPage);
