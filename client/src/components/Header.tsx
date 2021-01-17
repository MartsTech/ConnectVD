import { Avatar, Badge, IconButton } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "../styles/Header.module.css";
import { StyledBadge } from "../utils/StyledBadge";
import { Account } from "./Account";

export const Header: React.FC = () => {
  const [clickAvatar, setClickAvatar] = useState<boolean>(false);

  const user = useSelector(selectUser);

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
          <Badge badgeContent={11} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => setClickAvatar(!clickAvatar)}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar src={user?.photoUrl}>
              <span className={styles.letter}>{user?.email[0]}</span>
            </Avatar>
          </StyledBadge>
        </IconButton>
      </div>
      {clickAvatar && <Account />}
    </div>
  );
};
