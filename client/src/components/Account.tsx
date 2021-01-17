import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import styles from "../styles/Account.module.css";
import { StyledBadge } from "../utils/StyledBadge";
import { AccountItem } from "./AccountItem";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const Account: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.account}>
      <div className={styles.profile}>
        <Avatar className={styles.avatar} src={user?.photoUrl}>
          <span className={styles.letter}>{user?.email[0]}</span>
        </Avatar>
        <h3>{user?.displayName}</h3>
        <p>{user?.email}</p>
      </div>
      <div className={styles.items}>
        <AccountItem
          text="Available"
          Status={
            <StyledBadge
              className={styles.status}
              overlap="circle"
              variant="dot"
            />
          }
          RightIcon={ArrowForwardIosIcon}
          onClick={() => console.log("Hello")}
        />
        <AccountItem
          text="Log Out"
          LeftIcon={ExitToAppIcon}
          onClick={() => auth.signOut()}
        />
      </div>
    </div>
  );
};
