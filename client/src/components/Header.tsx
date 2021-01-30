import { Avatar, Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Header.module.css";
import { StatusBadge } from "./StatusBadge";
import { Dropdown } from "./dropdown/Dropdown";
import {
  useEmailsQuery,
  useFriendRequestsQuery,
  useMeQuery,
  useNewFriendRequstSubscription,
  useNewFriendSubscription,
} from "../generated/graphql";
import { openMenu, setMenuHeight } from "../features/dropdownSlice";
import { Snackbar } from "./Snackbar";
import { openSnackbar, selectSnackbar } from "../features/snackbarSlice";
import {
  closeSidebar,
  openSidebar,
  selectSidebar,
} from "../features/sidebarSlice";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<any>("");
  const [message, setMessage] = useState<{
    message: string;
    status: "error" | "warning" | "info" | "success";
  }>();

  const openedSnackbar = useSelector(selectSnackbar);
  const openedSidebar = useSelector(selectSidebar);

  const dispatch = useDispatch();

  const [{ data }] = useMeQuery();
  const [{ data: Requests }] = useFriendRequestsQuery();
  const [{ data: Emails }] = useEmailsQuery({ variables: { limit: 50 } });
  const [{ data: NewFriendReq }] = useNewFriendRequstSubscription();
  const [{ data: NewFriend }] = useNewFriendSubscription();

  useEffect(() => {
    if (typeof NewFriend?.newFriend !== "undefined") {
      if (NewFriend.newFriend !== lastMessage) {
        setMessage({ message: "New Frined.", status: "info" });
        setLastMessage(NewFriend.newFriend);
        dispatch(openSnackbar());
      }
    } else if (typeof NewFriendReq?.newFriendRequst !== "undefined") {
      if (NewFriendReq.newFriendRequst !== lastMessage) {
        setMessage({ message: "New Frined Request.", status: "info" });
        setLastMessage(NewFriendReq.newFriendRequst);
        dispatch(openSnackbar());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewFriendReq, NewFriend]);

  const activateMenu = (menu: "main" | "notifications") => {
    if (menu === activeDropdown) {
      setDropdown(false);
      setActiveDropdown("");
      dispatch(setMenuHeight("316"));
    } else {
      setDropdown(true);
      setActiveDropdown(menu);
    }
    dispatch(openMenu(menu));
  };

  const handleSidebar = () => {
    if (openedSidebar) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  return (
    <div className={styles.header}>
      {openedSnackbar && message && (
        <Snackbar message={message!.message} status={message!.status} />
      )}
      <div className={styles.left}>
        <IconButton onClick={() => handleSidebar()}>
          <MenuIcon />
        </IconButton>
      </div>
      <div className={styles.middle}>
        <SearchIcon />
        <input placeholder="Search" type="text" />
      </div>
      <div className={styles.right}>
        <Link to="/messages">
          <IconButton>
            <Badge
              badgeContent={Emails?.emails.emails.length}
              color="secondary"
            >
              <MailIcon />
            </Badge>
          </IconButton>
        </Link>

        <IconButton onClick={() => activateMenu("notifications")}>
          <Badge
            badgeContent={Requests?.friendRequests.length}
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => activateMenu("main")}>
          <StatusBadge status={data?.me?.status}>
            <Avatar src={data?.me?.photoUrl}>
              <span className={styles.letter}>{data?.me?.email[0]}</span>
            </Avatar>
          </StatusBadge>
        </IconButton>
      </div>
      {dropdown && <Dropdown />}
    </div>
  );
};
