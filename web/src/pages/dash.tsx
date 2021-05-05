import { auth } from "@config/firebase";
import { createUrqlClient } from "@util/createUrqlClient";
import {
  useCreateFriendRequestMutation,
  useCreateRoomMutation,
} from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import DashBoard from "@section/DashBoard";
import IsAuth from "@layout/IsAuth";
import DesktopLayout from "@layout/DesktopLayout";
import { useState } from "react";
import DashModel from "@section/DashModel";
import { useSnackbar, VariantType } from "notistack";

const DashPage = () => {
  const [user] = useAuthState(auth);

  const [, createRoom] = useCreateRoomMutation();
  const [, createFriendRequest] = useCreateFriendRequestMutation();

  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");

  const [joinModel, setJoinModel] = useState(false);
  const [friendModel, setFriendModel] = useState(false);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const startMeeting = async () => {
    const { data } = await createRoom({ uid: user?.uid as string });
    router.push(`/room/${data?.createRoom}`);
  };

  const sendFriendRequest = async () => {
    if (email === "") {
      enqueueSnackbar("You haven't enter an email", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    if (!email.includes("@")) {
      enqueueSnackbar("This email is not valid", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const response = await createFriendRequest({
      uid: user?.uid as string,
      email,
    });

    if (response.data?.createFriendRequest) {
      enqueueSnackbar(response.data.createFriendRequest.message, {
        variant: response.data.createFriendRequest.status as VariantType,
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <IsAuth>
      <DesktopLayout
        title="Dashboard"
        Main={
          <DashBoard
            startMeeting={startMeeting}
            onJoin={() => setJoinModel(!joinModel)}
            onFriend={() => setFriendModel(!friendModel)}
          />
        }
        onNoFriends={() => setFriendModel(!friendModel)}
      />
      <DashModel
        open={joinModel}
        onClose={() => setJoinModel(false)}
        title="Join Room"
        button="Join Now"
        field="Room Id"
        value={roomId}
        setValue={setRoomId}
        onButton={() => router.push(`/room/${roomId}}`)}
      />
      <DashModel
        open={friendModel}
        onClose={() => setFriendModel(false)}
        title="Add Friend"
        button="Add Now"
        field="Friend Email"
        fieldType="email"
        value={email}
        setValue={setEmail}
        onButton={() => sendFriendRequest()}
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(DashPage);
