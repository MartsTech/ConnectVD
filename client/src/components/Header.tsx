import { Avatar, Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Header.module.css";
import { StatusBadge } from "./StatusBadge";
import { Dropdown } from "./dropdown/Dropdown";
import {
  useFriendRequestsQuery,
  useMeQuery,
  useNewFriendRequstSubscription,
} from "../generated/graphql";
import { openMenu } from "../features/dropdownSlice";
import { Snackbar } from "./Snackbar";
import { openSnackbar } from "../features/snackbarSlice";

export const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const dispatch = useDispatch();

  const [{ data }] = useMeQuery();
  const [{ data: Requests }] = useFriendRequestsQuery();
  const [{ data: NewFriendReq }] = useNewFriendRequstSubscription();

  useEffect(() => {
    if (typeof NewFriendReq !== "undefined") dispatch(openSnackbar());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NewFriendReq]);

  const activateMenu = (menu: "main" | "notifications") => {
    if (menu === activeDropdown) {
      setDropdown(false);
      setActiveDropdown("");
    } else {
      setDropdown(true);
      setActiveDropdown(menu);
    }
    dispatch(openMenu(menu));
  };

  return (
    <div className={styles.header}>
      {NewFriendReq && <Snackbar message="New Friend Request" status="info" />}
      <div className={styles.left}>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
      <div className={styles.middle}>
        <SearchIcon />
        <input placeholder="Search" type="text" />
      </div>
      <div className={styles.right}>
        <IconButton>
          <Badge badgeContent={14} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
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
