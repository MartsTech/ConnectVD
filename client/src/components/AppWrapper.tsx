import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, selectSidebar } from "../features/sidebarSlice";
import {
  openSnackbar,
  selectSnackbar,
  selectSnackbarContent,
  setSnackbarContent,
} from "../features/snackbarSlice";
import { selectUser } from "../features/userSlice";
import {
  useNewEmailSubscription,
  useNewFriendRequstSubscription,
  useNewFriendSubscription,
  useNewInviteSubscription,
} from "../generated/graphql";
import styles from "../styles/AppWrapper.module.css";
import { useWindowWidth } from "../utils/useWindowWidth";
import { Nav } from "./Nav";
import { Sidebar } from "./Sidebar";
import { Snackbar } from "./Snackbar";

export const AppWrapper: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const snackbar = useSelector(selectSnackbar);
  const snackbarContent = useSelector(selectSnackbarContent);
  const sidebar = useSelector(selectSidebar);
  const dispatch = useDispatch();

  const [{ data: NewFriendReq }] = useNewFriendRequstSubscription({
    variables: { uid: user!.uid },
  });
  const [{ data: NewInvite }] = useNewInviteSubscription({
    variables: { uid: user!.uid },
  });
  const [{ data: NewFriend }] = useNewFriendSubscription({
    variables: { uid: user!.uid },
  });
  const [{ data: NewEmail }] = useNewEmailSubscription({
    variables: { uid: user!.uid },
  });

  const width = useWindowWidth();

  useEffect(() => {
    if (typeof width === "number" && width < 700) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (typeof NewFriendReq?.newFriendRequst !== "undefined") {
      dispatch(
        setSnackbarContent({
          message: "New Frined Request.",
          status: "info",
        })
      );
      dispatch(openSnackbar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewFriendReq]);

  useEffect(() => {
    if (typeof NewInvite?.newInvite !== "undefined") {
      dispatch(
        setSnackbarContent({
          message: "New Invite.",
          status: "info",
        })
      );
      dispatch(openSnackbar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewInvite]);

  useEffect(() => {
    if (typeof NewFriend?.newFriend !== "undefined") {
      dispatch(setSnackbarContent({ message: "New Frined.", status: "info" }));
      dispatch(openSnackbar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewFriend]);

  useEffect(() => {
    if (typeof NewEmail?.newEmail !== "undefined") {
      dispatch(setSnackbarContent({ message: "New Email.", status: "info" }));
      dispatch(openSnackbar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewEmail]);

  return (
    <div className={styles.app}>
      <Nav />
      <div className={styles.body}>
        {sidebar && <Sidebar />}
        {snackbar && snackbarContent && (
          <Snackbar
            message={snackbarContent.message}
            status={snackbarContent.status}
          />
        )}
        {typeof width === "number" && width < 700
          ? !sidebar && children
          : children}
      </div>
    </div>
  );
};
