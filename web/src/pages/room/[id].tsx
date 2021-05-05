import { server_url } from "@config/constants";
import { auth } from "@config/firebase";
import IsAuth from "@layout/IsAuth";
import Room from "@section/Room";
import RoomChat from "@section/RoomChat";
import RoomControls from "@section/RoomControls";
import RoomInvite from "@section/RoomInvite";
import appInfo from "@service/appInfo";
import RoomTemplate from "@template/RoomTemplate";
import { messageType } from "@type/messageType";
import { createUrqlClient } from "@util/createUrqlClient";
import {
  useFriendsQuery,
  useInviteFriendMutation,
  useMeQuery,
} from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { io, Socket } from "socket.io-client";

interface RoomPageProps {}

const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [meData] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [friendsData] = useFriendsQuery({
    pause: loading,
    variables: {
      uid: user?.uid as string,
    },
  });

  const [, createInvite] = useInviteFriendMutation();

  const socketRef = useRef<Socket>();

  const [chat, setChat] = useState(false);
  const [leave, setLeave] = useState(false);
  const [screen, setScreen] = useState(false);
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(true);
  const [invite, setInvite] = useState(false);

  const [messages, setMessages] = useState<messageType[]>([]);

  useEffect(() => {
    socketRef.current = io(server_url, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    socketRef.current?.on("chat message", (message: messageType) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const inviteFriend = async (email: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      enqueueSnackbar("The email is not in a correct format", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const response = await createInvite({
      uid: user?.uid as string,
      email,
    });
    if (response.data?.inviteFriend) {
      enqueueSnackbar(response.data?.inviteFriend.message, {
        variant: response.data.inviteFriend.status as VariantType,
        autoHideDuration: 3000,
      });
    }
  };

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
            onInvite={() => setInvite(!invite)}
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
      <RoomInvite
        data={friendsData.data}
        open={invite}
        onClose={() => setInvite(false)}
        onInvite={inviteFriend}
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(RoomPage);
