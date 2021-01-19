import { Avatar, Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "../styles/Header.module.css";
import { StatusBadge } from "./StatusBadge";
import { Dropdown } from "./dropdown/Dropdown";
import { useMeQuery } from "../generated/graphql";
import { openMenu } from "../features/dropdownSlice";

export const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const { data } = useMeQuery({ variables: { id: user!.uid } });

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
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => activateMenu("main")}>
          <StatusBadge status={data?.me?.status}>
            <Avatar src={user?.photoUrl}>
              <span className={styles.letter}>{user?.email[0]}</span>
            </Avatar>
          </StatusBadge>
        </IconButton>
      </div>
      {dropdown && <Dropdown />}
    </div>
  );
};
