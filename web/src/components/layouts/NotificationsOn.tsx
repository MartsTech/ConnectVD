import { auth } from "@config/firebase";
import { truncate } from "@util/truncate";
import {
  useNewEmailSubscription,
  useNewFriendRequstSubscription,
  useNewFriendSubscription,
  useNewInviteSubscription
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface NotificationsOnProps {}

const NotificationsOn: React.FC<NotificationsOnProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const [{ data: NewFriendReq }] = useNewFriendRequstSubscription({
    pause: loading,
    variables: { uid: user?.uid as string },
  });
  const [{ data: NewInvite }] = useNewInviteSubscription({
    pause: loading,
    variables: { uid: user?.uid as string },
  });
  const [{ data: NewFriend }] = useNewFriendSubscription({
    pause: loading,
    variables: { uid: user?.uid as string },
  });
  const [{ data: NewEmail }] = useNewEmailSubscription({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (NewFriendReq?.newFriendRequst) {
      const name = NewFriendReq?.newFriendRequst.user.displayName;

      enqueueSnackbar(`${truncate(name, 20)} send you a Frined Request`, {
        variant: "info",
        autoHideDuration: 3000,
      });
    }
  }, [NewFriendReq]);

  useEffect(() => {
    if (NewInvite?.newInvite) {
      const name = NewInvite?.newInvite.user.displayName;

      enqueueSnackbar(`${truncate(name, 20)} send you an Invite`, {
        variant: "info",
        autoHideDuration: 3000,
      });
    }
  }, [NewInvite]);

  useEffect(() => {
    if (NewFriend?.newFriend) {
      const name = NewFriend?.newFriend.user.displayName;

      enqueueSnackbar(`${truncate(name, 20)} is now your Friend`, {
        variant: "info",
        autoHideDuration: 3000,
      });
    }
  }, [NewFriend]);

  useEffect(() => {
    if (NewEmail?.newEmail) {
      enqueueSnackbar("You received a new Email", {
        variant: "info",
        autoHideDuration: 3000,
      });
    }
  }, [NewEmail]);

  return <>{children}</>;
};

export default NotificationsOn;
