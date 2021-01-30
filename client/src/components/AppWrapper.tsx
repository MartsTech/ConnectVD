import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, selectSidebar } from "../features/sidebarSlice";
import {
  openSnackbar,
  selectSnackbar,
  selectSnackbarContent,
  setSnackbarContent,
} from "../features/snackbarSlice";
import {
  useNewFriendRequstSubscription,
  useNewFriendSubscription,
} from "../generated/graphql";
import styles from "../styles/AppWrapper.module.css";
import { useWindowWidth } from "../utils/useWindowWidth";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Snackbar } from "./Snackbar";

export const AppWrapper: React.FC = ({ children }) => {
  const [lastMessage, setLastMessage] = useState<any>("");

  const sidebar = useSelector(selectSidebar);
  const snackbar = useSelector(selectSnackbar);
  const snackbarContent = useSelector(selectSnackbarContent);
  const dispatch = useDispatch();

  const [{ data: NewFriendReq }] = useNewFriendRequstSubscription();
  const [{ data: NewFriend }] = useNewFriendSubscription();

  const width = useWindowWidth();

  useEffect(() => {
    if (typeof width === "number" && width < 650) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (typeof NewFriend?.newFriend !== "undefined") {
      if (NewFriend.newFriend !== lastMessage) {
        setSnackbarContent({ message: "New Frined.", status: "info" });
        setLastMessage(NewFriend.newFriend);
        dispatch(openSnackbar());
      }
    } else if (typeof NewFriendReq?.newFriendRequst !== "undefined") {
      if (NewFriendReq.newFriendRequst !== lastMessage) {
        setSnackbarContent({ message: "New Frined Request.", status: "info" });
        setLastMessage(NewFriendReq.newFriendRequst);
        dispatch(openSnackbar());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewFriendReq, NewFriend]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.body}>
        {sidebar && <Sidebar />}
        {children}
        {snackbar && snackbarContent && (
          <Snackbar
            message={snackbarContent.message}
            status={snackbarContent.status}
          />
        )}
      </div>
    </div>
  );
};
