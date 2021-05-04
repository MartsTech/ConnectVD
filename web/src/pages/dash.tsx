import { auth } from "@config/firebase";
import { createUrqlClient } from "@util/createUrqlClient";
import { useCreateRoomMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import DashBoard from "@section/DashBoard";
import IsAuth from "@layout/IsAuth";
import DesktopLayout from "@layout/DesktopLayout";
import { useState } from "react";
import DashModel from "@section/DashModel";

const DashPage = () => {
  const [user] = useAuthState(auth);

  const [, createRoom] = useCreateRoomMutation();

  const [joinModel, setJoinModel] = useState(false);
  const [friendModel, setFriendModel] = useState(false);

  const router = useRouter();

  const startMeeting = async () => {
    const { data } = await createRoom({ uid: user?.uid as string });
    router.push(`/room/${data?.createRoom}`);
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
      />
      <DashModel
        open={joinModel}
        onClose={() => setJoinModel(false)}
        title="Join Room"
        button="Join Now"
        field="Room Id"
        onButton={() => alert("TODO")}
      />
      <DashModel
        open={friendModel}
        onClose={() => setFriendModel(false)}
        title="Add Friend"
        button="Add Now"
        field="Friend Email"
        fieldType="email"
        onButton={() => alert("TODO")}
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(DashPage);
