import { Avatar, Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openMenu, setMenuHeight } from "../features/dropdownSlice";
import {
  closeSidebar,
  openSidebar,
  selectSidebar,
} from "../features/sidebarSlice";
import {
  useEmailsQuery,
  useFriendRequestsQuery,
  useMeQuery,
} from "../generated/graphql";
import styles from "../styles/Header.module.css";
import { Dropdown } from "./dropdown/Dropdown";
import { StatusBadge } from "./StatusBadge";

export const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const openedSidebar = useSelector(selectSidebar);

  const dispatch = useDispatch();

  const [{ data }] = useMeQuery();
  const [{ data: Requests }] = useFriendRequestsQuery();
  const [{ data: Emails }] = useEmailsQuery({ variables: { limit: 50 } });

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
